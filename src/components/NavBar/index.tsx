import Web3Status from 'components/Web3Status'
import { Box } from 'nft/components/Box'
import { Row } from 'nft/components/Flex'
import { ReactNode } from 'react'
import { NavLink, NavLinkProps, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import { flexRowNoWrap } from 'theme/styles'
import { Z_INDEX } from 'theme/zIndex'

import { ChainSelector } from './ChainSelector'
import { FlameLogo } from './FlameLogo'
import * as styles from './style.css'

const HeaderWrapper = styled.div`
  ${flexRowNoWrap};
  background-color: rgba(5, 10, 13, 0.2);
  backdrop-filter: blur(5px);
  border-bottom: 1px solid #333;
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: ${Z_INDEX.sticky};
`

const MobileBottomBar = styled.div`
  position: fixed;
  display: flex;
  bottom: 0;
  right: 0;
  left: 0;
  justify-content: space-between;
  padding: 0;
  height: ${({ theme }) => theme.mobileBottomBarHeight}px;
  background: ${({ theme }) => theme.backgroundSurface};
  border-top: 1px solid ${({ theme }) => theme.backgroundOutline};
  z-index: ${Z_INDEX.fixed};

  @media screen and (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    display: none;
  }
`

const Nav = styled.nav`
  padding: 16px 32px;
  width: 100%;
  height: ${({ theme }) => theme.navHeight}px;
  z-index: 2;
`

const LogoContainer = styled(Box)`
  width: 185px;
  height: 52px;
  padding: 8px 12px;
`

const StyledFlameLogo = styled(FlameLogo)`
  width: 100%;
  height: auto;
`
interface MenuItemProps {
  to: NavLinkProps['to']
  id?: NavLinkProps['id']
  isActive?: boolean
  children: ReactNode
  dataTestId?: string
  isMobile?: boolean
}

const MenuItem = ({ to, dataTestId, id, isActive, children, isMobile = false }: MenuItemProps) => {
  return (
    <NavLink
      to={to}
      className={`${
        isActive
          ? isMobile
            ? styles.activeMobileMenuItem
            : styles.activeMenuItem
          : isMobile
          ? styles.mobileMenuItem
          : styles.menuItem
      }`}
      id={id}
      style={{ textDecoration: 'none' }}
      data-testid={dataTestId}
    >
      {children}
    </NavLink>
  )
}

const PageTabs = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { pathname } = useLocation()

  const isPoolActive =
    pathname.startsWith('/pool') ||
    pathname.startsWith('/add') ||
    pathname.startsWith('/remove') ||
    pathname.startsWith('/increase') ||
    pathname.startsWith('/find')

  return (
    <>
      <a href="https://bridge.astria.org/" className={`${isMobile ? styles.mobileMenuItem : styles.menuItem}`}>
        Bridge
      </a>
      <MenuItem to="/swap" isActive={pathname.startsWith('/swap')} isMobile={isMobile}>
        Swap
      </MenuItem>
      <MenuItem
        to="/pool"
        id={isMobile ? 'mobile-pool-nav-link' : 'pool-nav-link'}
        isActive={isPoolActive}
        isMobile={isMobile}
      >
        Pool
      </MenuItem>
    </>
  )
}

const MobilePageTabs = () => {
  return <PageTabs isMobile={true} />
}

const Navbar = () => {
  const navigate = useNavigate()

  return (
    <>
      <HeaderWrapper>
        <Nav>
          <Box display="flex" height="full" flexWrap="nowrap" alignItems="center">
            <Box className={styles.leftSideContainer}>
              <LogoContainer className={styles.logoContainer}>
                <StyledFlameLogo
                  width="221"
                  height="38"
                  className={styles.logo}
                  onClick={() => {
                    navigate('/')
                  }}
                />
              </LogoContainer>
            </Box>
            <Box className={styles.middleContainer} justifyContent="center">
              <Row gap="8" display={{ sm: 'none', lg: 'flex' }}>
                <PageTabs />
              </Row>
            </Box>
            <Box className={styles.rightSideContainer}>
              <Row gap="12">
                {/* <Box position="relative" display={{ sm: 'flex', xl: 'none' }}>
                <SearchBar />
              </Box> */}
                <Box>
                  <ChainSelector />
                </Box>

                <Web3Status />
              </Row>
            </Box>
          </Box>
        </Nav>
      </HeaderWrapper>
      <MobileBottomBar>
        <MobilePageTabs />
      </MobileBottomBar>
    </>
  )
}

export default Navbar
