import { styled } from "styled-components"

const Header = () => {
    return (
        <HeaderStyle>
            <h1>Book Store</h1>
        </HeaderStyle>
    )
}

const HeaderStyle = styled.header`
    background-color: ${({ theme }) => theme.color.background};
    padding: 1rem;
    text-align: center;
`

export default Header