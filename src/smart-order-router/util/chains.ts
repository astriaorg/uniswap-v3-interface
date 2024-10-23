import { Currency, Ether, NativeCurrency, Token } from '@uniswap/sdk-core'

export enum ChainId {
  MAINNET = 1,

  // Flame
  FLAME_DEVNET = 912559,
  FLAME_TESTNET = 16604737732183,
}

export const SUPPORTED_CHAINS: ChainId[] = [ChainId.FLAME_DEVNET, ChainId.FLAME_TESTNET]

export const V2_SUPPORTED = [ChainId.MAINNET]

export const HAS_L1_FEE = []

export const NETWORKS_WITH_SAME_UNISWAP_ADDRESSES = [ChainId.MAINNET]

export const ID_TO_CHAIN_ID = (id: number): ChainId => {
  switch (id) {
    case 1:
      return ChainId.MAINNET
    case 912559:
      return ChainId.FLAME_DEVNET
    case 16604737732183:
      return ChainId.FLAME_TESTNET
    default:
      throw new Error(`Unknown chain id: ${id}`)
  }
}

export enum ChainName {
  MAINNET = 'mainnet',
  FLAME_DEVNET = 'flame-devnet',
  FLAME_TESTNET = 'flame-testnet',
}

export enum NativeCurrencyName {
  // Strings match input for CLI
  ETHER = 'ETH',
  MATIC = 'MATIC',
  CELO = 'CELO',
  GNOSIS = 'XDAI',
  MOONBEAM = 'GLMR',
  RIA = 'RIA',
  TIA = 'TIA',
}
export const NATIVE_NAMES_BY_ID: { [chainId: number]: string[] } = {
  [ChainId.MAINNET]: ['ETH', 'ETHER', '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'],
  [ChainId.FLAME_DEVNET]: ['RIA', 'TIA'],
  [ChainId.FLAME_TESTNET]: ['TIA'],
}

export const NATIVE_CURRENCY: { [chainId: number]: NativeCurrencyName } = {
  [ChainId.MAINNET]: NativeCurrencyName.ETHER,
  [ChainId.FLAME_DEVNET]: NativeCurrencyName.RIA,
  [ChainId.FLAME_TESTNET]: NativeCurrencyName.TIA,
}

export const ID_TO_NETWORK_NAME = (id: number): ChainName => {
  switch (id) {
    case 1:
      return ChainName.MAINNET
    case 912559:
      return ChainName.FLAME_DEVNET
    case 16604737732183:
      return ChainName.FLAME_TESTNET
    default:
      throw new Error(`Unknown chain id: ${id}`)
  }
}

export const CHAIN_IDS_LIST = Object.values(ChainId).map((c) => c.toString()) as string[]

export const ID_TO_PROVIDER = (id: ChainId): string => {
  switch (id) {
    case ChainId.MAINNET:
      return process.env.JSON_RPC_PROVIDER!
    case ChainId.FLAME_DEVNET:
      return process.env.JSON_RPC_PROVIDER_FLAME_DEVNET!
    case ChainId.FLAME_TESTNET:
      return process.env.JSON_RPC_PROVIDER_FLAME_TESTNET!
    default:
      throw new Error(`Chain id: ${id} not supported`)
  }
}

export const WRAPPED_NATIVE_CURRENCY: { [chainId in ChainId]: Token } = {
  [ChainId.MAINNET]: new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'Wrapped Ether'),
  [ChainId.FLAME_DEVNET]: new Token(
    ChainId.FLAME_DEVNET,
    '0x6D71eb44a65560D1E917861059288200209054b4',
    18,
    'WRIA',
    'Wrapped RIA'
  ),
  [ChainId.FLAME_TESTNET]: new Token(
    ChainId.FLAME_TESTNET,
    '0xb1ed550217B33fdBeA6aA81b074A2DF8979AfA94',
    18,
    'WTIA',
    'Wrapped TIA'
  ),
}

function isFlame(chainId: number): chainId is ChainId.FLAME_DEVNET | ChainId.FLAME_TESTNET {
  return chainId === ChainId.FLAME_DEVNET || chainId === ChainId.FLAME_TESTNET
}

class FlameNativeCurrency extends NativeCurrency {
  equals(other: Currency): boolean {
    return other.isNative && other.chainId === this.chainId
  }

  get wrapped(): Token {
    if (!isFlame(this.chainId)) throw new Error('Not flame')
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[this.chainId]
    if (nativeCurrency) {
      return nativeCurrency
    }
    throw new Error(`Does not support this chain ${this.chainId}`)
  }

  public constructor(chainId: number) {
    if (!isFlame(chainId)) throw new Error('Not flame')
    super(
      chainId,
      18,
      chainId === ChainId.FLAME_DEVNET ? 'RIA' : 'TIA',
      chainId === ChainId.FLAME_DEVNET ? 'RIA' : 'TIA'
    )
  }
}

export class ExtendedEther extends Ether {
  public get wrapped(): Token {
    if (this.chainId in WRAPPED_NATIVE_CURRENCY) return WRAPPED_NATIVE_CURRENCY[this.chainId as ChainId]
    throw new Error('Unsupported chain ID')
  }

  private static _cachedExtendedEther: { [chainId: number]: NativeCurrency } = {}

  public static onChain(chainId: number): ExtendedEther {
    return this._cachedExtendedEther[chainId] ?? (this._cachedExtendedEther[chainId] = new ExtendedEther(chainId))
  }
}

const cachedNativeCurrency: { [chainId: number]: NativeCurrency } = {}
export function nativeOnChain(chainId: number): NativeCurrency {
  if (cachedNativeCurrency[chainId] != undefined) return cachedNativeCurrency[chainId]!
  else if (isFlame(chainId)) cachedNativeCurrency[chainId] = new FlameNativeCurrency(chainId)
  else cachedNativeCurrency[chainId] = ExtendedEther.onChain(chainId)

  return cachedNativeCurrency[chainId]!
}
