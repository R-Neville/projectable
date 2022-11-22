import { screen, render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider, {
  useThemeContext,
} from '../../context-providers/ThemeProvider';
import themes from '../../themes';
import ThemeButton from './ThemeButton';

const TestComponent = () => {
  const { theme } = useThemeContext();

  return (
    <div
      data-testid="color-test"
      style={{ backgroundColor: theme.bgPrimary }}
    ></div>
  );
};

describe('ThemeButton', () => {
  test('changes theme correctly on click', async () => {
    render(
      <ThemeProvider>
        <ThemeButton></ThemeButton>
        <TestComponent></TestComponent>
      </ThemeProvider>
    );

    const colorTest = screen.getByTestId('color-test');
    expect(colorTest).toHaveStyle({
      'background-color': themes.light.bgPrimary,
    });

    const themeButton = screen.getByTestId('theme-button');
    userEvent.click(themeButton);

    await waitFor(() =>
      expect(colorTest).toHaveStyle({
        'background-color': themes.dark.bgPrimary,
      })
    );
  });
});
