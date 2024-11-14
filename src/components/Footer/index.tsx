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
      <div className="content has-text-centered">
        <p>
          &copy; 2024. All Rights Reserved. <a href="https://www.astria.org/">Astria.org</a>
        </p>
        <p>
          <a target="_blank" href="https://www.astria.org/terms" rel="noreferrer">
            Terms of Service.
          </a>{' '}
          <a target="_blank" href="https://www.astria.org/privacy" rel="noreferrer">
            Privacy Policy.
          </a>
        </p>
      </div>
    </FooterWrapper>
  )
}
