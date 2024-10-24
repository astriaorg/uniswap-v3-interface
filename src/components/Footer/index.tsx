import styled from 'styled-components/macro'

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 16px;
  text-align: center;
  font-size: 16px;
  color: ${({ theme }) => theme.textPrimary};
  @media screen and (max-width: ${({ theme }) => theme.breakpoint.md}px) {
    display: none;
  }
  a {
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

export const Footer = () => {
  return (
    <FooterWrapper>
      Powered by <a href="https://www.astria.org/">Astria</a>
    </FooterWrapper>
  )
}
