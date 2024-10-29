import { Token } from '@uniswap/sdk-core'
import _ from 'lodash'

import { IERC20Metadata__factory } from '../types/v3/factories/IERC20Metadata__factory'
import { ChainId, log, WRAPPED_NATIVE_CURRENCY } from '../util'
import { IMulticallProvider } from './multicall-provider'
import { ProviderConfig } from './provider'

/**
 * Provider for getting token data.
 *
 * @export
 * @interface ITokenProvider
 */
export interface ITokenProvider {
  /**
   * Gets the token at each address. Any addresses that are not valid ERC-20 are ignored.
   *
   * @param addresses The token addresses to get.
   * @param [providerConfig] The provider config.
   * @returns A token accessor with methods for accessing the tokens.
   */
  getTokens(addresses: string[], providerConfig?: ProviderConfig): Promise<TokenAccessor>
}

export type TokenAccessor = {
  getTokenByAddress(address: string): Token | undefined
  getTokenBySymbol(symbol: string): Token | undefined
  getAllTokens: () => Token[]
}

// Some well known tokens on each chain for seeding cache / testing.
export const USDC_MAINNET = new Token(ChainId.MAINNET, '0x3f65144F387f6545bF4B19a1B39C94231E1c849F', 6, 'USDC', 'USDC')

export const WTIA_MAINNET = new Token(
  ChainId.MAINNET,
  '0x61B7794B6A0Cc383B367c327B91E5Ba85915a071',
  18,
  'WTIA',
  'Wrapped Celestia'
)

export const USDC_FLAME_DEVNET = new Token(
  ChainId.FLAME_DEVNET,
  '0xaACbd969a9570363E296327E17e4dCe1cb5B5834',
  6,
  'fUSDC',
  'Fake USDC'
)

export const WRIA_FLAME_DEVNET = new Token(
  ChainId.FLAME_DEVNET,
  '0x6D71eb44a65560D1E917861059288200209054b4',
  18,
  'WRIA',
  'Wrapped RIA'
)

export const USDC_FLAME_TESTNET = new Token(
  ChainId.FLAME_TESTNET,
  '0x6e18cE6Ec3Fc7b8E3EcFca4fA35e25F3f6FA879a',
  18,
  'USDC',
  'USDC (Noble)'
)

export const WTIA_FLAME_TESTNET = new Token(
  ChainId.FLAME_TESTNET,
  '0xb1ed550217B33fdBeA6aA81b074A2DF8979AfA94',
  18,
  'WTIA',
  'Wrapped Celestia'
)

export class TokenProvider implements ITokenProvider {
  constructor(private chainId: ChainId, protected multicall2Provider: IMulticallProvider) {}

  public async getTokens(_addresses: string[], providerConfig?: ProviderConfig): Promise<TokenAccessor> {
    const addressToToken: { [address: string]: Token } = {}
    const symbolToToken: { [symbol: string]: Token } = {}

    const addresses = _(_addresses)
      .map((address) => address.toLowerCase())
      .uniq()
      .value()

    if (addresses.length > 0) {
      const [symbolsResult, decimalsResult] = await Promise.all([
        this.multicall2Provider.callSameFunctionOnMultipleContracts<undefined, [string]>({
          addresses,
          contractInterface: IERC20Metadata__factory.createInterface(),
          functionName: 'symbol',
          providerConfig,
        }),
        this.multicall2Provider.callSameFunctionOnMultipleContracts<undefined, [number]>({
          addresses,
          contractInterface: IERC20Metadata__factory.createInterface(),
          functionName: 'decimals',
          providerConfig,
        }),
      ])

      const { results: symbols } = symbolsResult
      const { results: decimals } = decimalsResult

      for (let i = 0; i < addresses.length; i++) {
        const address = addresses[i]!

        const symbolResult = symbols[i]
        const decimalResult = decimals[i]

        if (!symbolResult?.success || !decimalResult?.success) {
          log.info(
            {
              symbolResult,
              decimalResult,
            },
            `Dropping token with address ${address} as symbol or decimal are invalid`
          )
          continue
        }

        const symbol = symbolResult.result[0]!
        const decimal = decimalResult.result[0]!

        addressToToken[address.toLowerCase()] = new Token(this.chainId, address, decimal, symbol)
        symbolToToken[symbol.toLowerCase()] = addressToToken[address.toLowerCase()]!
      }

      log.info(
        `Got token symbol and decimals for ${Object.values(addressToToken).length} out of ${
          addresses.length
        } tokens on-chain ${providerConfig ? `as of: ${providerConfig?.blockNumber}` : ''}`
      )
    }

    return {
      getTokenByAddress: (address: string): Token | undefined => {
        return addressToToken[address.toLowerCase()]
      },
      getTokenBySymbol: (symbol: string): Token | undefined => {
        return symbolToToken[symbol.toLowerCase()]
      },
      getAllTokens: (): Token[] => {
        return Object.values(addressToToken)
      },
    }
  }
}

export const DAI_ON = (chainId: ChainId): Token => {
  switch (chainId) {
    default:
      throw new Error(`Chain id: ${chainId} not supported`)
  }
}

export const USDT_ON = (chainId: ChainId): Token => {
  switch (chainId) {
    default:
      throw new Error(`Chain id: ${chainId} not supported`)
  }
}

export const USDC_ON = (chainId: ChainId): Token => {
  switch (chainId) {
    case ChainId.MAINNET:
      return USDC_MAINNET
    case ChainId.FLAME_DEVNET:
      return USDC_FLAME_DEVNET
    case ChainId.FLAME_TESTNET:
      return USDC_FLAME_TESTNET
    default:
      throw new Error(`Chain id: ${chainId} not supported`)
  }
}

export const WNATIVE_ON = (chainId: ChainId): Token => {
  return WRAPPED_NATIVE_CURRENCY[chainId]
}
