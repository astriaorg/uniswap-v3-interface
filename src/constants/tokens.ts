import { Currency, Ether, NativeCurrency, Token, WETH9 } from '@uniswap/sdk-core'
import invariant from 'tiny-invariant'

import { UNI_ADDRESS } from './addresses'
import { SupportedChainId } from './chains'

export const NATIVE_CHAIN_ID = 'NATIVE'

// When decimals are not specified for an ERC20 token
// use default ERC20 token decimals as specified here:
// https://docs.openzeppelin.com/contracts/3.x/erc20
export const DEFAULT_ERC20_DECIMALS = 18

export const USDC_MAINNET = new Token(
  SupportedChainId.MAINNET,
  '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  6,
  'USDC',
  'USD//C'
)
export const USDC_FLAME_DEVNET = new Token(
  SupportedChainId.FLAME_DEVNET,
  '0xaACbd969a9570363E296327E17e4dCe1cb5B5834',
  18,
  'fUSDC',
  'Fake USDC'
)
// const USDC_ROPSTEN = new Token(
//   SupportedChainId.ROPSTEN,
//   '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
//   6,
//   'USDC',
//   'USD//C'
// )
// const USDC_RINKEBY = new Token(
//   SupportedChainId.RINKEBY,
//   '0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b',
//   6,
//   'tUSDC',
//   'test USD//C'
// )
// const USDC_GOERLI = new Token(
//   SupportedChainId.GOERLI,
//   '0x07865c6e87b9f70255377e024ace6630c1eaa37f',
//   6,
//   'USDC',
//   'USD//C'
// )
// const USDC_KOVAN = new Token(SupportedChainId.KOVAN, '0x31eeb2d0f9b6fd8642914ab10f4dd473677d80df', 6, 'USDC', 'USD//C')
// export const USDC_OPTIMISM = new Token(
//   SupportedChainId.OPTIMISM,
//   '0x7F5c764cBc14f9669B88837ca1490cCa17c31607',
//   6,
//   'USDC',
//   'USD//C'
// )
// const USDC_OPTIMISM_GOERLI = new Token(
//   SupportedChainId.OPTIMISM_GOERLI,
//   '0x7E07E15D2a87A24492740D16f5bdF58c16db0c4E',
//   6,
//   'USDC',
//   'USD//C'
// )
// export const USDC_ARBITRUM = new Token(
//   SupportedChainId.ARBITRUM_ONE,
//   '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
//   6,
//   'USDC',
//   'USD//C'
// )
// const USDC_ARBITRUM_RINKEBY = new Token(
//   SupportedChainId.ARBITRUM_RINKEBY,
//   '0x09b98f8b2395d076514037ff7d39a091a536206c',
//   6,
//   'USDC',
//   'USD//C'
// )
// export const USDC_POLYGON = new Token(
//   SupportedChainId.POLYGON,
//   '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
//   6,
//   'USDC',
//   'USD//C'
// )
// const USDC_POLYGON_MUMBAI = new Token(
//   SupportedChainId.POLYGON_MUMBAI,
//   '0xe11a86849d99f524cac3e7a0ec1241828e332c62',
//   6,
//   'USDC',
//   'USD//C'
// )
// export const PORTAL_USDC_CELO = new Token(
//   SupportedChainId.CELO,
//   '0x37f750B7cC259A2f741AF45294f6a16572CF5cAd',
//   6,
//   'USDCet',
//   'USDC (Portal from Ethereum)'
// )
export const AMPL = new Token(
  SupportedChainId.MAINNET,
  '0xD46bA6D942050d489DBd938a2C909A5d5039A161',
  9,
  'AMPL',
  'Ampleforth'
)
export const DAI = new Token(
  SupportedChainId.MAINNET,
  '0x6B175474E89094C44Da98b954EedeAC495271d0F',
  18,
  'DAI',
  'Dai Stablecoin'
)
export const USDT = new Token(
  SupportedChainId.MAINNET,
  '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  6,
  'USDT',
  'Tether USD'
)
export const WBTC = new Token(
  SupportedChainId.MAINNET,
  '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
  8,
  'WBTC',
  'Wrapped BTC'
)
export const FEI = new Token(
  SupportedChainId.MAINNET,
  '0x956F47F50A910163D8BF957Cf5846D573E7f87CA',
  18,
  'FEI',
  'Fei USD'
)
export const TRIBE = new Token(
  SupportedChainId.MAINNET,
  '0xc7283b66Eb1EB5FB86327f08e1B5816b0720212B',
  18,
  'TRIBE',
  'Tribe'
)
export const FRAX = new Token(
  SupportedChainId.MAINNET,
  '0x853d955aCEf822Db058eb8505911ED77F175b99e',
  18,
  'FRAX',
  'Frax'
)
export const FXS = new Token(
  SupportedChainId.MAINNET,
  '0x3432B6A60D23Ca0dFCa7761B7ab56459D9C964D0',
  18,
  'FXS',
  'Frax Share'
)
export const renBTC = new Token(
  SupportedChainId.MAINNET,
  '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
  8,
  'renBTC',
  'renBTC'
)
export const ETH2X_FLI = new Token(
  SupportedChainId.MAINNET,
  '0xAa6E8127831c9DE45ae56bB1b0d4D4Da6e5665BD',
  18,
  'ETH2x-FLI',
  'ETH 2x Flexible Leverage Index'
)
export const sETH2 = new Token(
  SupportedChainId.MAINNET,
  '0xFe2e637202056d30016725477c5da089Ab0A043A',
  18,
  'sETH2',
  'StakeWise Staked ETH2'
)
export const rETH2 = new Token(
  SupportedChainId.MAINNET,
  '0x20BC832ca081b91433ff6c17f85701B6e92486c5',
  18,
  'rETH2',
  'StakeWise Reward ETH2'
)
export const SWISE = new Token(
  SupportedChainId.MAINNET,
  '0x48C3399719B582dD63eB5AADf12A40B4C3f52FA2',
  18,
  'SWISE',
  'StakeWise'
)

export const UNI: { [chainId: number]: Token } = {
  [SupportedChainId.MAINNET]: new Token(SupportedChainId.MAINNET, UNI_ADDRESS[1], 18, 'UNI', 'Uniswap'),
}

export const WRAPPED_NATIVE_CURRENCY: { [chainId: number]: Token | undefined } = {
  ...(WETH9 as Record<SupportedChainId, Token>),
  [SupportedChainId.FLAME_DEVNET]: new Token(
    SupportedChainId.FLAME_DEVNET,
    '0x6D71eb44a65560D1E917861059288200209054b4',
    18,
    'WRIA',
    'Wrapped RIA'
  ),
}

export function isCelo(chainId: number) {
  return false
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
    super(chainId, 18, 'RIA', 'RIA')
  }
}

class ExtendedEther extends Ether {
  public get wrapped(): Token {
    const wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (wrapped) return wrapped
    throw new Error('Unsupported chain ID')
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency | Token } = {}
export function nativeOnChain(chainId: number): NativeCurrency | Token {
  if (cachedNativeCurrency[chainId]) return cachedNativeCurrency[chainId]
  let nativeCurrency: NativeCurrency | Token
  if (chainId === SupportedChainId.MAINNET) {
    nativeCurrency = ExtendedEther.onChain(chainId)
  } else {
    nativeCurrency = new FlameNativeCurrency(chainId)
  }
  return (cachedNativeCurrency[chainId] = nativeCurrency)
}

export const TOKEN_SHORTHANDS: { [shorthand: string]: { [chainId in SupportedChainId]?: string } } = {
  USDC: {
    [SupportedChainId.MAINNET]: USDC_MAINNET.address,
  },
}
