import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components/macro'
import { Z_INDEX } from 'theme/zIndex'

const BannerWrapper = styled.div`
  width: 100%;
  background: #e63b36;
  position: fixed;
  top: 0;
  z-index: ${Z_INDEX.sticky + 1};
  text-align: center;
  line-height: 1.75;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`

const BannerLink = styled.a`
  color: white;
  font-weight: 500;
  text-decoration: underline;
  font-size: 16px;
  display: block;
  padding: 6px 0;

  &:hover {
    color: white;
    text-decoration: underline;
  }
`

export const BetaBanner = () => {
  const { pathname } = useLocation()

  // Only show on Swap page
  if (!pathname.startsWith('/swap')) {
    return null
  }

  return (
    <BannerWrapper>
      <BannerLink href="https://beta.flame.astria.org" target="_blank" rel="noopener noreferrer">
        Try the New Beta Bridge and Swap Website
      </BannerLink>
    </BannerWrapper>
  )
}
