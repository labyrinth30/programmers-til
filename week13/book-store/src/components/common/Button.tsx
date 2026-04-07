import styled from 'styled-components'
import type { ButtonSize, ButtonScheme } from '../../style/theme';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size: ButtonSize;
    scheme: ButtonScheme;
    disabled?: boolean;
    onClick?: () => void;
    isLoading?: boolean;
}


const Button = ({ children, size, scheme, disabled, onClick, isLoading }: Props) => {
    return <ButtonStyle size={size} scheme={scheme} disabled={disabled} onClick={onClick} isLoading={isLoading}>
        {children}
    </ButtonStyle>
}

const ButtonStyle = styled.button<Omit<Props, 'children'>>`
    font-size: ${({ theme, size }) => theme.button[size].fontSize};
    padding: ${({ theme, size }) => theme.button[size].padding};
    background-color: ${({ theme, scheme }) => theme.buttonScheme[scheme].backgroundColor};
    color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.default};
    opacity: ${({ disabled }) => disabled ? 0.5 : 1};
    pointer-events: ${({ disabled }) => disabled ? 'none' : 'auto'};
    cursor: ${({ disabled }) => disabled ? 'none' : 'pointer'};
`;

export default Button;