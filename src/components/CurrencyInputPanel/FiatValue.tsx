import { formatCurrencyAmount, formatPriceImpact, NumberType } from '@uniswap/conedison/format'
import { Currency, CurrencyAmount, Percent } from '@uniswap/sdk-core'
import { LoadingBubble } from 'components/Tokens/loading'
import { MouseoverTooltip } from 'components/Tooltip'
import { useEffect, useMemo, useState } from 'react'
import styled, { useTheme } from 'styled-components/macro'

import { ThemedText } from '../../theme'
import { warningSeverity } from '../../utils/prices'

const FiatLoadingBubble = styled(LoadingBubble)`
  border-radius: 4px;
  width: 4rem;
  height: 1rem;
`

export function FiatValue({
  fiatValue,
  priceImpact,
  isLoading = false,
}: {
  fiatValue: CurrencyAmount<Currency> | null | undefined
  priceImpact?: Percent
  isLoading?: boolean
}) {
  const theme = useTheme()
  const [showLoadingPlaceholder, setShowLoadingPlaceholder] = useState(false)
  const priceImpactColor = useMemo(() => {
    if (!priceImpact) return undefined
    if (priceImpact.lessThan('0')) return theme.deprecated_green1
    const severity = warningSeverity(priceImpact)
    if (severity < 1) return theme.deprecated_text3
    if (severity < 3) return theme.deprecated_yellow1
    return theme.deprecated_red1
  }, [priceImpact, theme.deprecated_green1, theme.deprecated_red1, theme.deprecated_text3, theme.deprecated_yellow1])

  useEffect(() => {
    const stale = false
    let timeoutId = 0
    if (isLoading && !fiatValue) {
      timeoutId = setTimeout(() => {
        if (!stale) setShowLoadingPlaceholder(true)
      }, 200) as unknown as number
    } else {
      setShowLoadingPlaceholder(false)
    }
    return () => clearTimeout(timeoutId)
  }, [isLoading, fiatValue])

  return (
    <ThemedText.DeprecatedBody fontSize={14} color={theme.textSecondary}>
      {showLoadingPlaceholder ? (
        <FiatLoadingBubble />
      ) : (
        <div>
          {fiatValue && <>{formatCurrencyAmount(fiatValue, NumberType.FiatTokenPrice)}</>}
          {priceImpact && (
            <span style={{ color: priceImpactColor }}>
              {' '}
              <MouseoverTooltip text="The estimated difference between the USD values of input and output amounts.">
                ({formatPriceImpact(priceImpact)})
              </MouseoverTooltip>
            </span>
          )}
        </div>
      )}
    </ThemedText.DeprecatedBody>
  )
}
