import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../../context-providers/ThemeProvider';
import Card from './Card';

describe('Card', () => {
  test('renders without errors when no props are passed', () => {
    render(
      <ThemeProvider>
        <Card />
      </ThemeProvider>
    );
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
  });

  test('displays title when title prop is passed', () => {
    render(
      <ThemeProvider>
        <Card title="title" />
      </ThemeProvider>
    );
    const title = screen.getByText(/title/);
    expect(title).toBeInTheDocument();
  });

  test('displays content when content prop is passed', () => {
    render(
      <ThemeProvider>
        <Card content="content" />
      </ThemeProvider>
    );
    const content = screen.getByText(/content/);
    expect(content).toBeInTheDocument();
  });

  test('onClick is fired when passed and the card is clicked', () => {
    const onClick = jest.fn();
    render(
      <ThemeProvider>
        <Card onClick={onClick} />
      </ThemeProvider>
    );
    const card = screen.getByTestId('card');
    userEvent.click(card);
    expect(onClick).toBeCalled();
  });
});
