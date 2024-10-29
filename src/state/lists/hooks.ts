import { ChainTokenMap, tokensToChainTokenMap } from 'lib/hooks/useTokenList/utils'
import { useMemo } from 'react'
import { useAppSelector } from 'state/hooks'

import { BROKEN_TOKEN_LIST, DEFAULT_TOKEN_LIST, UNSUPPORTED_TOKEN_LIST } from '../../constants/tokenLists'
import { AppState } from '../index'

export type TokenAddressMap = ChainTokenMap

type Mutable<T> = {
  -readonly [P in keyof T]: Mutable<T[P]>
}

export function useAllLists(): AppState['lists']['byUrl'] {
  return useAppSelector((state) => state.lists.byUrl)
}

/**
 * Combine the tokens in map2 with the tokens on map1, where tokens on map1 take precedence
 * @param map1 the base token map
 * @param map2 the map of additioanl tokens to add to the base map
 */
function combineMaps(map1: TokenAddressMap, map2: TokenAddressMap): TokenAddressMap {
  const chainIds = Object.keys(
    Object.keys(map1)
      .concat(Object.keys(map2))
      .reduce<{ [chainId: string]: true }>((memo, value) => {
        memo[value] = true
        return memo
      }, {})
  ).map((id) => parseInt(id))

  return chainIds.reduce<Mutable<TokenAddressMap>>((memo, chainId) => {
    memo[chainId] = {
      ...map2[chainId],
      // map1 takes precedence
      ...map1[chainId],
    }
    return memo
  }, {}) as TokenAddressMap
}

// get all the tokens from active lists, combine with local default tokens
export function useCombinedActiveList(): TokenAddressMap {
  return useMemo(() => tokensToChainTokenMap(DEFAULT_TOKEN_LIST), [])
}

// list of tokens not supported on interface for various reasons, used to show warnings and prevent swaps and adds
export function useUnsupportedTokenList(): TokenAddressMap {
  // get hard-coded broken tokens
  const brokenListMap = useMemo(() => tokensToChainTokenMap(BROKEN_TOKEN_LIST), [])

  // get dynamic list of unsupported tokens
  const loadedUnsupportedListMap = useMemo(() => tokensToChainTokenMap(UNSUPPORTED_TOKEN_LIST), [])

  // format into one token address map
  return useMemo(() => combineMaps(brokenListMap, loadedUnsupportedListMap), [brokenListMap, loadedUnsupportedListMap])
}
