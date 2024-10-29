import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984')

/* V3 Contract Addresses */
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0xc40CAc88C65B5fa4B3EE4FEAe2Cea443287f3879',
  [SupportedChainId.FLAME_TESTNET]: '0xbdb7C721ae69f36A303162E1e1FBC5ec445824E7',
  [SupportedChainId.MAINNET]: '0xE1EE203f374EE6CA6B72420844796c7acDf16A8b',
}

export const V3_MIGRATOR_ADDRESSES: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0x76dA40BD63e9F5c42edBB1d5e82deA66A8F35F27',
  [SupportedChainId.FLAME_TESTNET]: '0x349e965F2abf8366F013f1525a9FbCf07a6982ea',
  [SupportedChainId.MAINNET]: '0x65F23e6C7eAdd8824f944773c4BED3016d5E24FC',
}

export const MULTICALL_ADDRESS: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0x247718235bec841187bb46C70cdEA0fd6EEa316E',
  [SupportedChainId.FLAME_TESTNET]: '0x6536Ed5401F595dcFE055Eeb0829C0537eF2d247',
  [SupportedChainId.MAINNET]: '0x86AceBA84efCb6cd03939186A598141a33260436',
}

export const SWAP_ROUTER_ADDRESSES: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0x9ed37af540E50ddcCD2dd4D71d61BD458e9229c6',
  [SupportedChainId.FLAME_TESTNET]: '0x0DA34E6C6361f5B8f5Bdb6276fEE16dD241108c8',
  [SupportedChainId.MAINNET]: '0x29bBaFf21695fA41e446c4f37c07C699d9f08021',
}

export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
}

export const QUOTER_ADDRESSES: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0x5293068Cf96795c0cda7144Fa57B58cbAEfFf711',
  [SupportedChainId.FLAME_TESTNET]: '0xa96ad5AC05cFd6a6c3D4FC4fe95f97262266ea18',
  [SupportedChainId.MAINNET]: '0x066c175fb0B8B4D1c4c2F89796Ba17D916a86eAD',
}

export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = {
  [SupportedChainId.FLAME_DEVNET]: '0x371cC275651E799890E8409102D7Cc1910647ceD',
  [SupportedChainId.FLAME_TESTNET]: '0x186C4bFBef4748d78Bc3C7B7628298528BbFEe47',
  [SupportedChainId.MAINNET]: '0x1dAfd262A228571125f36f1a1333389dB0444edA',
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
  [SupportedChainId.MAINNET]: '0x8d9a1428683a003F1686e47640D721293a27432d',
}
