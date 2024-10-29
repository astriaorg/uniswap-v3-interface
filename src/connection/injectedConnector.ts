import { EIP1193 } from '@web3-react/eip1193'
import type { Actions, AddEthereumChainParameter, Provider, ProviderRpcError } from '@web3-react/types'

function parseChainId(chainId: string) {
  return Number.parseInt(chainId, 16)
}

export class InjectedConnector extends EIP1193 {
  constructor({
    actions,
    provider,
    onError,
  }: {
    actions: Actions
    provider: Provider
    onError?: (error: Error) => void
  }) {
    if (!provider) {
      throw new Error('Provider is required')
    }
    super({
      actions,
      provider,
      onError,
    })
  }

  private async activateAccounts(requestAccounts: () => Promise<string[]>): Promise<[string[], number]> {
    const cancelActivation = this.actions.startActivation()

    try {
      // Wallets may resolve eth_chainId and hang on eth_accounts pending user interaction, which may include changing
      // chains; they should be requested serially, with accounts first, so that the chainId can settle.
      const accounts = await requestAccounts()
      const chainId = (await this.provider.request({ method: 'eth_chainId' })) as string
      const receivedChainId = parseChainId(chainId)
      this.actions.update({ chainId: receivedChainId, accounts })
      return [accounts, receivedChainId]
    } catch (error) {
      cancelActivation()
      throw error
    }
  }

  /** {@inheritdoc Connector.connectEagerly} */
  public async connectEagerly(): Promise<void> {
    this.activateAccounts(() => this.provider.request({ method: 'eth_accounts' }) as Promise<string[]>)
  }

  /** {@inheritdoc Connector.activate} */
  public async activate(desiredChainIdOrChainParameters?: number | AddEthereumChainParameter): Promise<void> {
    const cancelActivation = this.actions.startActivation()

    try {
      const [accounts, receivedChainId] = await this.activateAccounts(
        () =>
          this.provider
            .request({ method: 'eth_requestAccounts' })
            .catch(() => this.provider.request({ method: 'eth_accounts' })) as Promise<string[]>
      )

      const desiredChainId =
        typeof desiredChainIdOrChainParameters === 'number'
          ? desiredChainIdOrChainParameters
          : desiredChainIdOrChainParameters?.chainId

      // if there's no desired chain, or it's equal to the received, update
      if (!desiredChainId || receivedChainId === desiredChainId)
        return this.actions.update({ chainId: receivedChainId, accounts })

      const desiredChainIdHex = `0x${desiredChainId.toString(16)}`

      this.provider
        .request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: desiredChainIdHex }],
        })
        .catch((error: ProviderRpcError) => {
          console.log('ProviderRpcError', error)
          // https://github.com/MetaMask/metamask-mobile/issues/3312#issuecomment-1065923294
          const errorCode = (error.data as any)?.originalError?.code || error.code

          // 4902 indicates that the chain has not been added to MetaMask and wallet_addEthereumChain needs to be called
          // https://docs.metamask.io/guide/rpc-api.html#wallet-switchethereumchain
          if (errorCode === 4902 && typeof desiredChainIdOrChainParameters !== 'number') {
            if (!this.provider) throw new Error('No provider')
            // if we're here, we can try to add a new network
            return this.provider.request({
              method: 'wallet_addEthereumChain',
              params: [{ ...desiredChainIdOrChainParameters, chainId: desiredChainIdHex }],
            })
          }

          throw error
        })
        .then(() => this.activate(desiredChainId))
    } catch (error) {
      cancelActivation()
      throw error
    }
  }
}
