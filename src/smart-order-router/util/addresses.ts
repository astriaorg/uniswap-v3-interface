import { Token } from '@uniswap/sdk-core'
import { FACTORY_ADDRESS } from '@uniswap/v3-sdk'

import { ChainId, NETWORKS_WITH_SAME_UNISWAP_ADDRESSES } from './chains'

export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  ...constructSameAddressMap(FACTORY_ADDRESS),

  [ChainId.FLAME_DEVNET]: '0xc40CAc88C65B5fa4B3EE4FEAe2Cea443287f3879',
  [ChainId.FLAME_TESTNET]: '0xbdb7C721ae69f36A303162E1e1FBC5ec445824E7',

  // TODO: Gnosis + Moonbeam contracts to be deployed
}

export const QUOTER_V2_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x61fFE014bA17989E743c5F6cB21bF9697530B21e'),

  [ChainId.FLAME_DEVNET]: '0x5293068Cf96795c0cda7144Fa57B58cbAEfFf711',
  [ChainId.FLAME_TESTNET]: '0xa96ad5AC05cFd6a6c3D4FC4fe95f97262266ea18',
  // TODO: Gnosis + Moonbeam contracts to be deployed
}

export const MIXED_ROUTE_QUOTER_V1_ADDRESSES: AddressMap = {
  [ChainId.MAINNET]: '0x84E44095eeBfEC7793Cd7d5b57B7e401D7f1cA2E',
}

export const UNISWAP_MULTICALL_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984'),

  [ChainId.FLAME_DEVNET]: '0x247718235bec841187bb46C70cdEA0fd6EEa316E',
  [ChainId.FLAME_TESTNET]: '0x6536Ed5401F595dcFE055Eeb0829C0537eF2d247',
  // TODO: Gnosis + Moonbeam contracts to be deployed
}

export const OVM_GASPRICE_ADDRESS = '0x420000000000000000000000000000000000000F'
export const ARB_GASINFO_ADDRESS = '0x000000000000000000000000000000000000006C'

export const TICK_LENS_ADDRESS = '0xD66B3E98dbB58594eBCBdBbf1F0476aA02d8991f'
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = '0x371cC275651E799890E8409102D7Cc1910647ceD'
export const SWAP_ROUTER_ADDRESS = '0x9ed37af540E50ddcCD2dd4D71d61BD458e9229c6'
export const V3_MIGRATOR_ADDRESS = '0x76dA40BD63e9F5c42edBB1d5e82deA66A8F35F27'
export const MULTICALL2_ADDRESS = '0x247718235bec841187bb46C70cdEA0fd6EEa316E'

export type AddressMap = { [chainId: number]: string }

export function constructSameAddressMap<T extends string>(
  address: T,
  additionalNetworks: ChainId[] = []
): { [chainId: number]: T } {
  return NETWORKS_WITH_SAME_UNISWAP_ADDRESSES.concat(additionalNetworks).reduce<{
    [chainId: number]: T
  }>((memo, chainId) => {
    memo[chainId] = address
    return memo
  }, {})
}

export const WETH9: {
  [chainId in ChainId]: Token
} = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    18,
    'WETH',
    'Wrapped Ether'
  ),
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
    'Wrapped Celestia'
  ),
}
