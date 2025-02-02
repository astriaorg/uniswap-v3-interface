import { SupportedChainId } from './chains'

/**
 * Fallback JSON-RPC endpoints.
 * These are used if the integrator does not provide an endpoint, or if the endpoint does not work.
 *
 * MetaMask allows switching to any URL, but displays a warning if it is not on the "Safe" list:
 * https://github.com/MetaMask/metamask-mobile/blob/bdb7f37c90e4fc923881a07fca38d4e77c73a579/app/core/RPCMethods/wallet_addEthereumChain.js#L228-L235
 * https://chainid.network/chains.json
 *
 * These "Safe" URLs are listed first, followed by other fallback URLs, which are taken from chainlist.org.
 */
export const FALLBACK_URLS: { [key in SupportedChainId]: string[] } = {
  [SupportedChainId.MAINNET]: ['https://rpc.flame.astria.org/'],
  [SupportedChainId.FLAME_DEVNET]: ['https://rpc.evm.dusk-11.devnet.astria.org/'],
  [SupportedChainId.FLAME_TESTNET]: ['https://rpc.flame.dawn-1.astria.org/'],
}

/**
 * Known JSON-RPC endpoints.
 * These are the URLs used by the interface when there is not another available source of chain data.
 */
export const RPC_URLS: { [key in SupportedChainId]: string[] } = {
  [SupportedChainId.MAINNET]: FALLBACK_URLS[SupportedChainId.MAINNET],
  [SupportedChainId.FLAME_DEVNET]: FALLBACK_URLS[SupportedChainId.FLAME_DEVNET],
  [SupportedChainId.FLAME_TESTNET]: FALLBACK_URLS[SupportedChainId.FLAME_TESTNET],
}
