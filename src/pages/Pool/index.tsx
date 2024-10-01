import { useWeb3React } from '@web3-react/core'
import { ButtonGray, ButtonPrimary, ButtonText } from 'components/Button'
import { AutoColumn } from 'components/Column'
import { Menu } from 'components/Menu'
import PositionList from 'components/PositionList'
import { RowBetween, RowFixed } from 'components/Row'
import { isSupportedChain } from 'constants/chains'
import { useV3Positions } from 'hooks/useV3Positions'
import { AlertTriangle, Inbox } from 'react-feather'
import { Link } from 'react-router-dom'
import { useToggleWalletModal } from 'state/application/hooks'
import { useUserHideClosedPositions } from 'state/user/hooks'
import styled, { css, useTheme } from 'styled-components/macro'
import { ThemedText } from 'theme'
import { PositionDetails } from 'types/position'

import { LoadingRows } from './styleds'

const PageWrapper = styled(AutoColumn)`
  padding: 68px 8px 0px;
  max-width: 870px;
  width: 100%;

  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToMedium`
    max-width: 800px;
  `};

  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToSmall`
    max-width: 500px;
  `};

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.md}px`}) {
    padding-top: 48px;
  }

  @media only screen and (max-width: ${({ theme }) => `${theme.breakpoint.sm}px`}) {
    padding-top: 20px;
  }
`

export const PoolWrapper = styled(AutoColumn)`
  position: relative;
  background: radial-gradient(100% 100% at 50.15% 0%, #221f1f 0%, #050a0d 100%);
  border-radius: 32px;
  box-shadow: inset 1px 1px 1px -1px rgba(255, 255, 255, 0.5);
  padding: 40px;
  transition: transform 250ms ease;
`

const TitleRow = styled(RowBetween)`
  color: ${({ theme }) => theme.deprecated_text2};
  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToSmall`
    flex-wrap: wrap;
    gap: 12px;
    width: 100%;
  `};
`
const ButtonRow = styled(RowFixed)`
  & > *:not(:last-child) {
    margin-left: 8px;
  }

  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToSmall`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    flex-direction: row-reverse;
  `};
`
const PoolMenu = styled(Menu)`
  margin-left: 0;
  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToSmall`
    flex: 1 1 auto;
    width: 49%;
    right: 0px;
  `};

  a {
    width: 100%;
  }
`
const PoolMenuItem = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-weight: 500;
`
const MoreOptionsButton = styled(ButtonGray)`
  border-radius: 12px;
  flex: 1 1 auto;
  padding: 6px 8px;
  width: 100%;
  background-color: ${({ theme }) => theme.deprecated_bg0};
  margin-right: 8px;
`

const MoreOptionsText = styled(ThemedText.DeprecatedBody)`
  align-items: center;
  display: flex;
`

const ErrorContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  max-width: 300px;
  min-height: 25vh;
`

const IconStyle = css`
  width: 48px;
  height: 48px;
  margin-bottom: 0.5rem;
`

const NetworkIcon = styled(AlertTriangle)`
  ${IconStyle}
`

const InboxIcon = styled(Inbox)`
  ${IconStyle}
`

const ResponsiveButtonPrimary = styled(ButtonPrimary)`
  border-radius: 12px;
  font-size: 16px;
  padding: 12px 20px;
  width: fit-content;
  ${({ theme }) => theme.deprecated_mediaWidth.deprecated_upToSmall`
    flex: 1 1 auto;
    width: 100%;
  `};
`

const MainContentWrapper = styled.main`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 0px;
  display: flex;
  flex-direction: column;
`

function PositionsLoadingPlaceholder() {
  return (
    <LoadingRows>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </LoadingRows>
  )
}

function WrongNetworkCard() {
  const theme = useTheme()

  return (
    <PageWrapper>
      <AutoColumn gap="lg" justify="center">
        <PoolWrapper gap="lg" style={{ width: '100%' }}>
          <TitleRow padding="0">
            <ThemedText.LargeHeader>Pools</ThemedText.LargeHeader>
          </TitleRow>

          <MainContentWrapper>
            <ErrorContainer>
              <ThemedText.DeprecatedBody color={theme.deprecated_text3} textAlign="center">
                <NetworkIcon strokeWidth={1.2} />
                <div data-testid="pools-unsupported-err">Your connected network is unsupported.</div>
              </ThemedText.DeprecatedBody>
            </ErrorContainer>
          </MainContentWrapper>
        </PoolWrapper>
      </AutoColumn>
    </PageWrapper>
  )
}

export default function Pool() {
  const { account, chainId } = useWeb3React()
  const toggleWalletModal = useToggleWalletModal()

  const theme = useTheme()
  const [userHideClosedPositions, setUserHideClosedPositions] = useUserHideClosedPositions()

  const { positions, loading: positionsLoading } = useV3Positions(account)

  if (!isSupportedChain(chainId)) {
    return <WrongNetworkCard />
  }

  const [openPositions, closedPositions] = positions?.reduce<[PositionDetails[], PositionDetails[]]>(
    (acc, p) => {
      acc[p.liquidity?.isZero() ? 1 : 0].push(p)
      return acc
    },
    [[], []]
  ) ?? [[], []]

  const filteredPositions = [...openPositions, ...(userHideClosedPositions ? [] : closedPositions)]
  const showConnectAWallet = Boolean(!account)

  return (
    <PageWrapper>
      <AutoColumn gap="lg" justify="center">
        <PoolWrapper gap="lg" style={{ width: '100%' }}>
          <TitleRow padding="0">
            <ThemedText.LargeHeader>Pools</ThemedText.LargeHeader>
            <ButtonRow>
              <ResponsiveButtonPrimary data-cy="join-pool-button" id="join-pool-button" as={Link} to="/add/TIA">
                + New Position
              </ResponsiveButtonPrimary>
            </ButtonRow>
          </TitleRow>

          <MainContentWrapper>
            {positionsLoading ? (
              <PositionsLoadingPlaceholder />
            ) : filteredPositions && closedPositions && filteredPositions.length > 0 ? (
              <PositionList
                positions={filteredPositions}
                setUserHideClosedPositions={setUserHideClosedPositions}
                userHideClosedPositions={userHideClosedPositions}
              />
            ) : (
              <ErrorContainer>
                <ThemedText.DeprecatedBody color={theme.deprecated_text3} textAlign="center">
                  <InboxIcon strokeWidth={1} style={{ marginTop: '2em' }} />
                  <div>Your active V3 liquidity positions will appear here.</div>
                </ThemedText.DeprecatedBody>
                {!showConnectAWallet && closedPositions.length > 0 && (
                  <ButtonText
                    style={{ marginTop: '.5rem' }}
                    onClick={() => setUserHideClosedPositions(!userHideClosedPositions)}
                  >
                    Show closed positions
                  </ButtonText>
                )}
                {showConnectAWallet && (
                  <ButtonPrimary
                    style={{ marginTop: '2em', marginBottom: '2em', padding: '8px 16px' }}
                    onClick={toggleWalletModal}
                  >
                    Connect a wallet
                  </ButtonPrimary>
                )}
              </ErrorContainer>
            )}
          </MainContentWrapper>
        </PoolWrapper>
      </AutoColumn>
    </PageWrapper>
  )
}
