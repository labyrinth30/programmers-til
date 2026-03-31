import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Title from "./Title";
import { BookStoreThemeProvider } from "../../context/themeContext";

describe('Title', () => {
    it('renders correctly', () => {
        render(
            <BookStoreThemeProvider>
                <Title size="large">Home</Title>
            </BookStoreThemeProvider>
        );
        expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('renders with different sizes', () => {
        render(
            <BookStoreThemeProvider>
                <Title size="large">Large</Title>
                <Title size="medium">Medium</Title>
                <Title size="small">Small</Title>
            </BookStoreThemeProvider>
        );
        expect(screen.getByText('Large')).toBeInTheDocument();
        expect(screen.getByText('Medium')).toBeInTheDocument();
        expect(screen.getByText('Small')).toBeInTheDocument();
    });

    it('renders with different colors', () => {
        render(
            <BookStoreThemeProvider>
                <Title size="large" color="primary">Primary</Title>
                <Title size="medium" color="secondary">Secondary</Title>
                <Title size="small" color="third">Third</Title>
            </BookStoreThemeProvider>
        );
        expect(screen.getByText('Primary')).toBeInTheDocument();
        expect(screen.getByText('Secondary')).toBeInTheDocument();
        expect(screen.getByText('Third')).toBeInTheDocument();
    });
});