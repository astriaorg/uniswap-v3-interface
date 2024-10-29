// a list of tokens by chain
import { Currency, Token } from '@uniswap/sdk-core'

import { SupportedChainId } from './chains'
import { nativeOnChain, USDC_FLAME_DEVNET, USDC_FLAME_TESTNET, USDC_MAINNET, WRAPPED_NATIVE_CURRENCY } from './tokens'

type ChainTokenList = {
  readonly [chainId: number]: Token[]
}

type ChainCurrencyList = {
  readonly [chainId: number]: Currency[]
}

const WRAPPED_NATIVE_CURRENCIES_ONLY: ChainTokenList = Object.fromEntries(
  Object.entries(WRAPPED_NATIVE_CURRENCY)
    .map(([key, value]) => [key, [value]])
    .filter(Boolean)
)

// used to construct intermediary pairs for trading
export const BASES_TO_CHECK_TRADES_AGAINST: ChainTokenList = {
  ...WRAPPED_NATIVE_CURRENCIES_ONLY,
  [SupportedChainId.MAINNET]: [...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.MAINNET], USDC_MAINNET],
  [SupportedChainId.FLAME_DEVNET]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.FLAME_DEVNET],
    USDC_FLAME_DEVNET,
  ],
  [SupportedChainId.FLAME_TESTNET]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.FLAME_TESTNET],
    USDC_FLAME_TESTNET,
  ],
}
export const ADDITIONAL_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {}

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId: number]: { [tokenAddress: string]: Token[] } } = {}

/**
 * Shows up in the currency select for swap and add liquidity
 */
export const COMMON_BASES: ChainCurrencyList = {
  [SupportedChainId.MAINNET]: [
    nativeOnChain(SupportedChainId.MAINNET),
    USDC_MAINNET,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET] as Token,
  ],
  [SupportedChainId.FLAME_DEVNET]: [
    nativeOnChain(SupportedChainId.FLAME_DEVNET),
    USDC_FLAME_DEVNET,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.FLAME_DEVNET] as Token,
  ],
  [SupportedChainId.FLAME_TESTNET]: [
    nativeOnChain(SupportedChainId.FLAME_TESTNET),
    USDC_FLAME_TESTNET,
    WRAPPED_NATIVE_CURRENCY[SupportedChainId.FLAME_TESTNET] as Token,
  ],
}

// used to construct the list of all pairs we consider by default in the frontend
export const BASES_TO_TRACK_LIQUIDITY_FOR: ChainTokenList = {
  ...WRAPPED_NATIVE_CURRENCIES_ONLY,
  [SupportedChainId.MAINNET]: [...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.MAINNET], USDC_MAINNET],
  [SupportedChainId.FLAME_DEVNET]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.FLAME_DEVNET],
    USDC_FLAME_DEVNET,
  ],
  [SupportedChainId.FLAME_TESTNET]: [
    ...WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.FLAME_TESTNET],
    USDC_FLAME_TESTNET,
  ],
}
export const PINNED_PAIRS: { readonly [chainId: number]: [Token, Token][] } = {
  [SupportedChainId.MAINNET]: [[WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.MAINNET][0], USDC_MAINNET]],
  [SupportedChainId.FLAME_DEVNET]: [
    [WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.FLAME_DEVNET][0], USDC_FLAME_DEVNET],
  ],
  [SupportedChainId.FLAME_TESTNET]: [
    [WRAPPED_NATIVE_CURRENCIES_ONLY[SupportedChainId.FLAME_TESTNET][0], USDC_FLAME_TESTNET],
  ],
}
