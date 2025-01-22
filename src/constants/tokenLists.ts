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
    chainId: SupportedChainId.FLAME_TESTNET,
    address: '0x0F0C3207a9fE9B7e8AaE4bb83E865C91A13Fd8a7',
    name: 'Drop Staked TIA',
    symbol: 'dTIA',
    decimals: 18,
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
  {
    chainId: SupportedChainId.MAINNET,
    address: '0xdf941D092b10FF07eAb44bD174dEe915c13FECcd',
    name: 'Stride TIA',
    symbol: 'stTIA',
    decimals: 18,
  },
  {
    chainId: SupportedChainId.MAINNET,
    address: '0xcbb93e854AA4EF5Db51c3b094F28952eF0dC67bE',
    name: 'Milk TIA',
    symbol: 'milkTIA',
    decimals: 18,
  },
  {
    chainId: SupportedChainId.MAINNET,
    address: '0x1E3b0f82d049379FEd8C0b67D915Ea925067e5f2',
    name: 'Drop Staked TIA',
    symbol: 'dTIA',
    decimals: 18,
  },
]

export const EXTENDED_TOKEN_LIST: TokenInfo[] = []
export const BROKEN_TOKEN_LIST: TokenInfo[] = []
export const UNSUPPORTED_TOKEN_LIST: TokenInfo[] = []
