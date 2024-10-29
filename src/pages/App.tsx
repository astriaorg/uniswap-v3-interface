import Loader from 'components/Loader'
import { useFeatureFlagsIsLoaded } from 'featureFlags'
import { LandingPageVariant, useLandingPageFlag } from 'featureFlags/flags/landingPage'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'

import { useAnalyticsReporter } from '../components/analytics'
import ErrorBoundary from '../components/ErrorBoundary'
import { Footer } from '../components/Footer'
import NavBar from '../components/NavBar'
import Polling from '../components/Polling'
import Popups from '../components/Popups'
import DarkModeQueryParamReader from '../theme/components/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import { RedirectDuplicateTokenIds } from './AddLiquidity/redirects'
import Landing from './Landing'
import Pool from './Pool'
import { PositionPage } from './Pool/PositionPage'
import RemoveLiquidityV3 from './RemoveLiquidity/V3'
import Swap from './Swap'
import { RedirectPathToSwapOnly } from './Swap/redirects'
const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  min-height: 100vh;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 72px 0px 0px 0px;
  align-items: center;
  flex: 1;
  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToSmall`
    padding: 52px 0px 16px 0px;
  `};
`

const Marginer = styled.div`
  margin-top: 5rem;
`

export default function App() {
  const isLoaded = useFeatureFlagsIsLoaded()

  const { pathname } = useLocation()

  useAnalyticsReporter()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  const landingPageFlag = useLandingPageFlag()

  return (
    <ErrorBoundary>
      <DarkModeQueryParamReader />
      <ApeModeQueryParamReader />
      <AppWrapper>
        <NavBar />
        <BodyWrapper>
          <Popups />
          <Polling />
          <Suspense fallback={<Loader />}>
            {isLoaded ? (
              <Routes>
                {landingPageFlag === LandingPageVariant.Enabled && <Route path="/" element={<Landing />} />}

                <Route path="swap" element={<Swap />} />

                <Route path="pool" element={<Pool />} />
                <Route path="pool/:tokenId" element={<PositionPage />} />

                <Route path="add" element={<RedirectDuplicateTokenIds />}>
                  {/* this is workaround since react-router-dom v6 doesn't support optional parameters any more */}
                  <Route path=":currencyIdA" />
                  <Route path=":currencyIdA/:currencyIdB" />
                  <Route path=":currencyIdA/:currencyIdB/:feeAmount" />
                </Route>

                <Route path="increase" element={<AddLiquidity />}>
                  <Route path=":currencyIdA" />
                  <Route path=":currencyIdA/:currencyIdB" />
                  <Route path=":currencyIdA/:currencyIdB/:feeAmount" />
                  <Route path=":currencyIdA/:currencyIdB/:feeAmount/:tokenId" />
                </Route>

                <Route path="remove/:tokenId" element={<RemoveLiquidityV3 />} />

                <Route path="*" element={<RedirectPathToSwapOnly />} />
              </Routes>
            ) : (
              <Loader />
            )}
          </Suspense>
          <Marginer />
        </BodyWrapper>
        <Footer />
      </AppWrapper>
    </ErrorBoundary>
  )
}
