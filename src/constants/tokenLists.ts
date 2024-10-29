import { TokenInfo } from '@uniswap/token-lists'

import { SupportedChainId } from './chains'
import { USDC_FLAME_DEVNET, USDC_FLAME_TESTNET, USDC_MAINNET, WRAPPED_NATIVE_CURRENCY } from './tokens'

// the ultra blessed tokens
export const DEFAULT_TOKEN_LIST: TokenInfo[] = [
  {
    chainId: SupportedChainId.FLAME_DEVNET,
    address: USDC_FLAME_DEVNET.address,
    name: USDC_FLAME_DEVNET.name!,
    symbol: USDC_FLAME_DEVNET.symbol!,
    decimals: USDC_FLAME_DEVNET.decimals,
  },
  {
    chainId: SupportedChainId.FLAME_DEVNET,
    address: WRAPPED_NATIVE_CURRENCY[SupportedChainId.FLAME_DEVNET]!.address,
    name: WRAPPED_NATIVE_CURRENCY[SupportedChainId.FLAME_DEVNET]!.name!,
    symbol: WRAPPED_NATIVE_CURRENCY[SupportedChainId.FLAME_DEVNET]!.symbol!,
    decimals: WRAPPED_NATIVE_CURRENCY[SupportedChainId.FLAME_DEVNET]!.decimals,
  },
  {
    chainId: SupportedChainId.FLAME_TESTNET,
    address: USDC_FLAME_TESTNET.address,
    name: USDC_FLAME_TESTNET.name!,
    symbol: USDC_FLAME_TESTNET.symbol!,
    decimals: USDC_FLAME_TESTNET.decimals,
  },
  {
    chainId: SupportedChainId.FLAME_TESTNET,
    address: WRAPPED_NATIVE_CURRENCY[SupportedChainId.FLAME_TESTNET]!.address,
    name: WRAPPED_NATIVE_CURRENCY[SupportedChainId.FLAME_TESTNET]!.name!,
    symbol: WRAPPED_NATIVE_CURRENCY[SupportedChainId.FLAME_TESTNET]!.symbol!,
    decimals: WRAPPED_NATIVE_CURRENCY[SupportedChainId.FLAME_TESTNET]!.decimals,
  },
  {
    chainId: SupportedChainId.MAINNET,
    address: USDC_MAINNET.address,
    name: USDC_MAINNET.name!,
    symbol: USDC_MAINNET.symbol!,
    decimals: USDC_MAINNET.decimals,
  },
  {
    chainId: SupportedChainId.MAINNET,
    address: WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET]!.address,
    name: WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET]!.name!,
    symbol: WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET]!.symbol!,
    decimals: WRAPPED_NATIVE_CURRENCY[SupportedChainId.MAINNET]!.decimals,
  },
]

export const EXTENDED_TOKEN_LIST: TokenInfo[] = []
export const BROKEN_TOKEN_LIST: TokenInfo[] = []
export const UNSUPPORTED_TOKEN_LIST: TokenInfo[] = []
