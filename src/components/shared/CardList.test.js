import { screen, render } from '@testing-library/react';
import ThemeProvider from '../../context-providers/ThemeProvider';
import CardList from './CardList';

describe('CardList', () => {
  test('renders children correctly', () => {
    render(
      <ThemeProvider>
        <CardList>
          <p>test element 1</p>
          <p>test element 2</p>
        </CardList>
      </ThemeProvider>
    );

    const testElement1 = screen.getByText(/test element 1/);
    const testElement2 = screen.getByText(/test element 2/);

    expect(testElement1).toBeInTheDocument();
    expect(testElement2).toBeInTheDocument();
  });
});
