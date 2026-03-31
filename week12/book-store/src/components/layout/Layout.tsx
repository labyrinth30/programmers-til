import styled from "styled-components"
import Footer from "../common/Footer.tsx"
import Header from "../common/Header.tsx"

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <LayoutStyle>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </LayoutStyle>
    )
}

const LayoutStyle = styled.main`
    width: 100%;
    margin: 0 auto;
    max-width: ${({ theme }) => theme.layout.width.large};
    padding: 2rem 0;
`
export default Layout