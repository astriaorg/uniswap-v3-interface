import { Currency, NativeCurrency, Token, WETH9 } from '@uniswap/sdk-core'
import invariant from 'tiny-invariant'

import { SupportedChainId } from './chains'

export const NATIVE_CHAIN_ID = 'NATIVE'

// When decimals are not specified for an ERC20 token
// use default ERC20 token decimals as specified here:
// https://docs.openzeppelin.com/contracts/3.x/erc20
export const DEFAULT_ERC20_DECIMALS = 18

export const USDC_MAINNET = new Token(
  SupportedChainId.MAINNET,
  '0x3f65144F387f6545bF4B19a1B39C94231E1c849F',
  6,
  'USDC',
  'USDC'
)
export const USDC_FLAME_DEVNET = new Token(
  SupportedChainId.FLAME_DEVNET,
  '0xaACbd969a9570363E296327E17e4dCe1cb5B5834',
  6,
  'fUSDC',
  'Fake USDC'
)

export const USDC_FLAME_TESTNET = new Token(
  SupportedChainId.FLAME_TESTNET,
  '0x6e18cE6Ec3Fc7b8E3EcFca4fA35e25F3f6FA879a',
  18,
  'USDC',
  'USDC (Noble)'
)

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } = {
  ...(WETH9 as Record<SupportedChainId, Token>),
  [SupportedChainId.MAINNET]: new Token(
    SupportedChainId.MAINNET,
    '0x61B7794B6A0Cc383B367c327B91E5Ba85915a071',
    18,
    'WTIA',
    'Wrapped Celestia'
  ),
  [SupportedChainId.FLAME_DEVNET]: new Token(
    SupportedChainId.FLAME_DEVNET,
    '0x6D71eb44a65560D1E917861059288200209054b4',
    18,
    'WRIA',
    'Wrapped RIA'
  ),
  [SupportedChainId.FLAME_TESTNET]: new Token(
    SupportedChainId.FLAME_TESTNET,
    '0xb1ed550217B33fdBeA6aA81b074A2DF8979AfA94',
    18,
    'WTIA',
    'Wrapped Celestia'
  ),
}

class FlameDevnetNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    super(chainId, 18, 'RIA', 'RIA')
  }
}

class FlameNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    invariant(wrapped instanceof Token)
    return wrapped
  }

  public constructor(chainId: number) {
    super(chainId, 18, 'TIA', 'TIA')
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency | Token } = {}
export function nativeOnChain(chainId: number): NativeCurrency | Token {
  if (cachedNativeCurrency[chainId]) return cachedNativeCurrency[chainId]
  let nativeCurrency: NativeCurrency | Token
  if (chainId === SupportedChainId.MAINNET) {
    nativeCurrency = new FlameNativeCurrency(chainId)
  } else if (chainId === SupportedChainId.FLAME_TESTNET) {
    nativeCurrency = new FlameNativeCurrency(chainId)
  } else {
    nativeCurrency = new FlameDevnetNativeCurrency(chainId)
  }
  return (cachedNativeCurrency[chainId] = nativeCurrency)
}

export const TOKEN_SHORTHANDS: { [shorthand: string]: { [chainId in SupportedChainId]?: string } } = {
  USDC: {
    [SupportedChainId.MAINNET]: USDC_MAINNET.address,
    [SupportedChainId.FLAME_DEVNET]: USDC_FLAME_DEVNET.address,
    [SupportedChainId.FLAME_TESTNET]: USDC_FLAME_TESTNET.address,
  },
}
