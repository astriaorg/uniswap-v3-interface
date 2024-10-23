import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')

/* V3 Contract Addresses */
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0xc40CAc88C65B5fa4B3EE4FEAe2Cea443287f3879',
  [SupportedChainId.FLAME_TESTNET]: '0xbdb7C721ae69f36A303162E1e1FBC5ec445824E7',
}

export const V3_MIGRATOR_ADDRESSES: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0x76dA40BD63e9F5c42edBB1d5e82deA66A8F35F27',
  [SupportedChainId.FLAME_TESTNET]: '0x349e965F2abf8366F013f1525a9FbCf07a6982ea',
}

export const MULTICALL_ADDRESS: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0x247718235bec841187bb46C70cdEA0fd6EEa316E',
  [SupportedChainId.FLAME_TESTNET]: '0x6536Ed5401F595dcFE055Eeb0829C0537eF2d247',
}

export const SWAP_ROUTER_ADDRESSES: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0x9ed37af540E50ddcCD2dd4D71d61BD458e9229c6',
  [SupportedChainId.FLAME_TESTNET]: '0x0DA34E6C6361f5B8f5Bdb6276fEE16dD241108c8',
}

/**
 * The oldest V0 governance address
 */
export const GOVERNANCE_ALPHA_V0_ADDRESSES: AddressMap = constructSameAddressMap(
  '0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'
)
/**
 * The older V1 governance address
 */
export const GOVERNANCE_ALPHA_V1_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6',
}
/**
 * The latest governor bravo that is currently admin of timelock
 */
export const GOVERNANCE_BRAVO_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x408ED6354d4973f66138C91495F2f2FCbd8724C3',
}

export const TIMELOCK_ADDRESS: AddressMap = constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC')

export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
}

export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}

export const QUOTER_ADDRESSES: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0x5293068Cf96795c0cda7144Fa57B58cbAEfFf711',
  [SupportedChainId.FLAME_TESTNET]: '0xa96ad5AC05cFd6a6c3D4FC4fe95f97262266ea18',
}

export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0x371cC275651E799890E8409102D7Cc1910647ceD',
  [SupportedChainId.FLAME_TESTNET]: '0x186C4bFBef4748d78Bc3C7B7628298528BbFEe47',
}

export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
}

export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
}

export const TICK_LENS_ADDRESSES: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0xD66B3E98dbB58594eBCBdBbf1F0476aA02d8991f',
  [SupportedChainId.FLAME_TESTNET]: '0x730bB85De1eC42b77f8C05a27a519772502e9809',
}
