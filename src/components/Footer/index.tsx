import styled from 'styled-components/macro'

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 12px;
  background-color: ${({ theme }) => theme.backgroundSurface};
  border-top: 1px solid ${({ theme }) => theme.backgroundOutline};
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.textSecondary};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.md}px) {
    display: none;
  }
  a {
    color: ${({ theme }) => theme.textSecondary};
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.textPrimary};
    }
  }
`

export const Footer = () => {
  return (
    <FooterWrapper>
      <p>
        Powered by <a href="https://www.astria.org/">Astria</a>
      </p>
    </FooterWrapper>
  )
}
