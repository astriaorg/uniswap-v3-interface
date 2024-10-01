import { Currency } from '@uniswap/sdk-core'

export enum PairState {
  LOADING,
  NOT_EXISTS,
  EXISTS,
  INVALID,
}

export function useV2Pairs(currencies: [Currency | undefined, Currency | undefined][]): [PairState, null][] {
  return [[PairState.NOT_EXISTS, null]]
}

export function useV2Pair(tokenA?: Currency, tokenB?: Currency): [PairState, null] {
  return [PairState.NOT_EXISTS, null]
}
