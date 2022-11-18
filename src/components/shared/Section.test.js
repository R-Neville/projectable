import { screen, render } from '@testing-library/react';
import ThemeProvider from '../../context-providers/ThemeProvider';
import Section from './Section';

describe('Section', () => {
  test('renders without errors when no props are passed', () => {
    render(
      <ThemeProvider>
        <Section></Section>
      </ThemeProvider>
    );
    const section = screen.getByTestId('section');
    expect(section).toBeInTheDocument();
  });

  test('renders title correctly', () => {
    render(
      <ThemeProvider>
        <Section title="test"></Section>
      </ThemeProvider>
    );
    const title = screen.getByText(/test/);
    expect(title).toBeInTheDocument();
  });

  test('renders children correctly', () => {
    render(
      <ThemeProvider>
        <Section>
          <p>child-1</p>
          <p>child-2</p>
        </Section>
      </ThemeProvider>
    );
    const child1 = screen.getByText(/child-1/);
    expect(child1).toBeInTheDocument();
    const child2 = screen.getByText(/child-2/);
    expect(child2).toBeInTheDocument();
  });
});
