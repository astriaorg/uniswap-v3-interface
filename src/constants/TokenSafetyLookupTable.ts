import { BROKEN_TOKEN_LIST, DEFAULT_TOKEN_LIST, EXTENDED_TOKEN_LIST, UNSUPPORTED_TOKEN_LIST } from './tokenLists'
import { NATIVE_CHAIN_ID } from './tokens'

export enum TOKEN_LIST_TYPES {
  UNI_DEFAULT = 1,
  UNI_EXTENDED,
  UNKNOWN,
  BLOCKED,
  BROKEN,
}

class TokenSafetyLookupTable {
  dict: { [key: string]: TOKEN_LIST_TYPES } | null = null

  createMap() {
    const dict: { [key: string]: TOKEN_LIST_TYPES } = {}

    // Initialize extended tokens first
    EXTENDED_TOKEN_LIST.forEach((token) => {
      dict[token.address.toLowerCase()] = TOKEN_LIST_TYPES.UNI_EXTENDED
    })

    // Initialize default tokens second, so that any tokens on both default and extended will display as default (no warning)
    DEFAULT_TOKEN_LIST.forEach((token) => {
      dict[token.address.toLowerCase()] = TOKEN_LIST_TYPES.UNI_DEFAULT
    })

    // TODO: Figure out if this list is still relevant
    BROKEN_TOKEN_LIST.forEach((token) => {
      dict[token.address.toLowerCase()] = TOKEN_LIST_TYPES.BROKEN
    })

    // Initialize blocked tokens
    UNSUPPORTED_TOKEN_LIST.forEach((token) => {
      dict[token.address.toLowerCase()] = TOKEN_LIST_TYPES.BLOCKED
    })

    return dict
  }

  checkToken(address: string) {
    if (!this.dict) {
      this.dict = this.createMap()
    }
    if (address === NATIVE_CHAIN_ID.toLowerCase()) {
      return TOKEN_LIST_TYPES.UNI_DEFAULT
    }
    return this.dict[address] ?? TOKEN_LIST_TYPES.UNKNOWN
  }
}

export default new TokenSafetyLookupTable()
