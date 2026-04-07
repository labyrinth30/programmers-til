import styled from "styled-components"
import logo from "../../assets/images/logo.png"


const Footer = () => {
    return (
        <FooterStyle>
            <h1 className="logo">
                <img src={logo} alt="bookstore" />
            </h1>
            <div className="copyright">
                <p>copyright(c), 2026, BookStore</p>
            </div>
        </FooterStyle>
    )
}

const FooterStyle = styled.footer`
    width: 100%;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.width.large};
    border-top: 1px solid ${({ theme }) => theme.color.background};
    padding: 20px 0;
    display: flex;
    justify-content: space-between;

    .logo {
        img {
            width: 120px;
        }
    }

    .copyright {
        p {
            font-size: 0.75rem;
            color: ${({ theme }) => theme.color.text};
        }
    }
`


export default Footer
