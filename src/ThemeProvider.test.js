import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider, { useThemeContext } from './ThemeProvider';
import themes from './themes';

const ThemeTestComponent = () => {
  const { theme, toggleTheme } = useThemeContext();

  let spans = [];

  for (let color in theme) {
    spans.push(
      <span>
        {color} {theme[color]}
      </span>
    );
  }

  return (
    <>
      {spans}
      <button onClick={toggleTheme}></button>
    </>
  );
};

describe('ThemeProvider', () => {
  test('provides the 2 predefined themes to child elements', () => {
    render(
      <ThemeProvider>
        <ThemeTestComponent />
      </ThemeProvider>
    );

    for (let color in themes.light) {
      const span = screen.getByText(`${color} ${themes.light[color]}`);
      expect(span).toBeInTheDocument();
    }

    const button = document.querySelector('button');

    userEvent.click(button);

    for (let color in themes.dark) {
      const span = screen.getByText(`${color} ${themes.dark[color]}`);
      expect(span).toBeInTheDocument();
    }
  });
});
