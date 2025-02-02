import { BigNumber } from '@ethersproject/bignumber'
import { Pool } from '@uniswap/v3-sdk'
import _ from 'lodash'

import { WRAPPED_NATIVE_CURRENCY } from '../../../..'
import { ChainId } from '../../../../util'
import { CurrencyAmount } from '../../../../util/amounts'
import { getHighestLiquidityV3NativePool, getHighestLiquidityV3USDPool } from '../../../../util/gas-factory-helpers'
import { log } from '../../../../util/log'
import { V3RouteWithValidQuote } from '../../entities/route-with-valid-quote'
import { BuildOnChainGasModelFactoryType, IGasModel, IOnChainGasModelFactory } from '../gas-model'
import { BASE_SWAP_COST, COST_PER_HOP, COST_PER_INIT_TICK, COST_PER_UNINIT_TICK } from './gas-costs'

/**
 * Computes a gas estimate for a V3 swap using heuristics.
 * Considers number of hops in the route, number of ticks crossed
 * and the typical base cost for a swap.
 *
 * We get the number of ticks crossed in a swap from the QuoterV2
 * contract.
 *
 * We compute gas estimates off-chain because
 *  1/ Calling eth_estimateGas for a swaps requires the caller to have
 *     the full balance token being swapped, and approvals.
 *  2/ Tracking gas used using a wrapper contract is not accurate with Multicall
 *     due to EIP-2929. We would have to make a request for every swap we wanted to estimate.
 *  3/ For V2 we simulate all our swaps off-chain so have no way to track gas used.
 *
 * @export
 * @class V3HeuristicGasModelFactory
 */
export class V3HeuristicGasModelFactory extends IOnChainGasModelFactory {
  constructor() {
    super()
  }

  public async buildGasModel({
    chainId,
    gasPriceWei,
    v3poolProvider: poolProvider,
    token,
  }: BuildOnChainGasModelFactoryType): Promise<IGasModel<V3RouteWithValidQuote>> {
    const usdPool: Pool = await getHighestLiquidityV3USDPool(chainId, poolProvider)

    const calculateL1GasFees = async (
      _route: V3RouteWithValidQuote[]
    ): Promise<{
      gasUsedL1: BigNumber
      gasCostL1USD: CurrencyAmount
      gasCostL1QuoteToken: CurrencyAmount
    }> => {
      const l1Used = BigNumber.from(0)
      const l1FeeInWei = BigNumber.from(0)

      // wrap fee to native currency
      const nativeCurrency = WRAPPED_NATIVE_CURRENCY[chainId]
      const costNativeCurrency = CurrencyAmount.fromRawAmount(nativeCurrency, l1FeeInWei.toString())

      // convert fee into usd
      const nativeTokenPrice =
        usdPool.token0.address == nativeCurrency.address ? usdPool.token0Price : usdPool.token1Price

      const gasCostL1USD: CurrencyAmount = nativeTokenPrice.quote(costNativeCurrency)

      let gasCostL1QuoteToken = costNativeCurrency
      // if the inputted token is not in the native currency, quote a native/quote token pool to get the gas cost in terms of the quote token
      if (!token.equals(nativeCurrency)) {
        const nativePool: Pool | null = await getHighestLiquidityV3NativePool(token, poolProvider)
        if (!nativePool) {
          log.info('Could not find a pool to convert the cost into the quote token')
          gasCostL1QuoteToken = CurrencyAmount.fromRawAmount(token, 0)
        } else {
          const nativeTokenPrice =
            nativePool.token0.address == nativeCurrency.address ? nativePool.token0Price : nativePool.token1Price
          gasCostL1QuoteToken = nativeTokenPrice.quote(costNativeCurrency)
        }
      }
      // gasUsedL1 is the gas units used calculated from the bytes of the calldata
      // gasCostL1USD and gasCostL1QuoteToken is the cost of gas in each of those tokens
      return {
        gasUsedL1: l1Used,
        gasCostL1USD,
        gasCostL1QuoteToken,
      }
    }

    // If our quote token is WETH, we don't need to convert our gas use to be in terms
    // of the quote token in order to produce a gas adjusted amount.
    // We do return a gas use in USD however, so we still convert to usd.
    const nativeCurrency = WRAPPED_NATIVE_CURRENCY[chainId]!
    if (token.equals(nativeCurrency)) {
      const estimateGasCost = (
        routeWithValidQuote: V3RouteWithValidQuote
      ): {
        gasEstimate: BigNumber
        gasCostInToken: CurrencyAmount
        gasCostInUSD: CurrencyAmount
      } => {
        const { totalGasCostNativeCurrency, baseGasUse } = this.estimateGas(routeWithValidQuote, gasPriceWei, chainId)

        const token0 = usdPool.token0.address == nativeCurrency.address

        const nativeTokenPrice = token0 ? usdPool.token0Price : usdPool.token1Price

        const gasCostInTermsOfUSD: CurrencyAmount = nativeTokenPrice.quote(totalGasCostNativeCurrency) as CurrencyAmount

        return {
          gasEstimate: baseGasUse,
          gasCostInToken: totalGasCostNativeCurrency,
          gasCostInUSD: gasCostInTermsOfUSD,
        }
      }

      return {
        estimateGasCost,
        calculateL1GasFees,
      }
    }

    // If the quote token is not in the native currency, we convert the gas cost to be in terms of the quote token.
    // We do this by getting the highest liquidity <quoteToken>/<nativeCurrency> pool. eg. <quoteToken>/ETH pool.
    const nativePool: Pool | null = await getHighestLiquidityV3NativePool(token, poolProvider)

    const usdToken = usdPool.token0.address == nativeCurrency.address ? usdPool.token1 : usdPool.token0

    const estimateGasCost = (
      routeWithValidQuote: V3RouteWithValidQuote
    ): {
      gasEstimate: BigNumber
      gasCostInToken: CurrencyAmount
      gasCostInUSD: CurrencyAmount
    } => {
      const { totalGasCostNativeCurrency, baseGasUse } = this.estimateGas(routeWithValidQuote, gasPriceWei, chainId)

      if (!nativePool) {
        log.info(
          `Unable to find ${nativeCurrency.symbol} pool with the quote token, ${token.symbol} to produce gas adjusted costs. Route will not account for gas.`
        )
        return {
          gasEstimate: baseGasUse,
          gasCostInToken: CurrencyAmount.fromRawAmount(token, 0),
          gasCostInUSD: CurrencyAmount.fromRawAmount(usdToken, 0),
        }
      }

      const token0 = nativePool.token0.address == nativeCurrency.address

      // returns mid price in terms of the native currency (the ratio of quoteToken/nativeToken)
      const nativeTokenPrice = token0 ? nativePool.token0Price : nativePool.token1Price

      let gasCostInTermsOfQuoteToken: CurrencyAmount
      try {
        // native token is base currency
        gasCostInTermsOfQuoteToken = nativeTokenPrice.quote(totalGasCostNativeCurrency) as CurrencyAmount
      } catch (err) {
        log.info(
          {
            nativeTokenPriceBase: nativeTokenPrice.baseCurrency,
            nativeTokenPriceQuote: nativeTokenPrice.quoteCurrency,
            gasCostInEth: totalGasCostNativeCurrency.currency,
          },
          'Debug eth price token issue'
        )
        throw err
      }

      // true if token0 is the native currency
      const token0USDPool = usdPool.token0.address == nativeCurrency.address

      // gets the mid price of the pool in terms of the native token
      const nativeTokenPriceUSDPool = token0USDPool ? usdPool.token0Price : usdPool.token1Price

      let gasCostInTermsOfUSD: CurrencyAmount
      try {
        gasCostInTermsOfUSD = nativeTokenPriceUSDPool.quote(totalGasCostNativeCurrency) as CurrencyAmount
      } catch (err) {
        log.info(
          {
            usdT1: usdPool.token0.symbol,
            usdT2: usdPool.token1.symbol,
            gasCostInNativeToken: totalGasCostNativeCurrency.currency.symbol,
          },
          'Failed to compute USD gas price'
        )
        throw err
      }

      return {
        gasEstimate: baseGasUse,
        gasCostInToken: gasCostInTermsOfQuoteToken,
        gasCostInUSD: gasCostInTermsOfUSD!,
      }
    }

    return {
      estimateGasCost: estimateGasCost.bind(this),
      calculateL1GasFees,
    }
  }

  private estimateGas(routeWithValidQuote: V3RouteWithValidQuote, gasPriceWei: BigNumber, chainId: ChainId) {
    const totalInitializedTicksCrossed = BigNumber.from(
      Math.max(1, _.sum(routeWithValidQuote.initializedTicksCrossedList))
    )
    const totalHops = BigNumber.from(routeWithValidQuote.route.pools.length)

    const hopsGasUse = COST_PER_HOP(chainId).mul(totalHops)
    const tickGasUse = COST_PER_INIT_TICK(chainId).mul(totalInitializedTicksCrossed)
    const uninitializedTickGasUse = COST_PER_UNINIT_TICK.mul(0)

    // base estimate gas used based on chainId estimates for hops and ticks gas useage
    const baseGasUse = BASE_SWAP_COST(chainId).add(hopsGasUse).add(tickGasUse).add(uninitializedTickGasUse)

    const baseGasCostWei = gasPriceWei.mul(baseGasUse)

    const wrappedCurrency = WRAPPED_NATIVE_CURRENCY[chainId]!

    const totalGasCostNativeCurrency = CurrencyAmount.fromRawAmount(wrappedCurrency, baseGasCostWei.toString())

    return {
      totalGasCostNativeCurrency,
      totalInitializedTicksCrossed,
      baseGasUse,
    }
  }
}
