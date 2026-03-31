import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";
import { BookStoreThemeProvider } from "../../context/themeContext";

describe('Button', () => {
    it('renders correctly', () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" schema="primary">Home</Button>
            </BookStoreThemeProvider>
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('renders with different sizes', () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" schema="primary">Large</Button>
                <Button size="medium" schema="primary">Medium</Button>
                <Button size="small" schema="primary">Small</Button>
            </BookStoreThemeProvider>
        );
        expect(screen.getByText('Large')).toBeInTheDocument();
        expect(screen.getByText('Medium')).toBeInTheDocument();
        expect(screen.getByText('Small')).toBeInTheDocument();
    });

    it('renders with different schemas', () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" schema="primary">Primary</Button>
                <Button size="medium" schema="normal">Normal</Button>
            </BookStoreThemeProvider>
        );
        expect(screen.getByText('Primary')).toBeInTheDocument();
        expect(screen.getByText('Normal')).toBeInTheDocument();
    });

    it('renders with different disabled states', () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" schema="primary" disabled>Disabled</Button>
            </BookStoreThemeProvider>
        );
        expect(screen.getByText('Disabled')).toBeInTheDocument();
    });

    it('renders with different loading states', () => {
        render(
            <BookStoreThemeProvider>
                <Button size="large" schema="primary" isLoading>Loading</Button>
            </BookStoreThemeProvider>
        );
        expect(screen.getByText('Loading')).toBeInTheDocument();
    });
});