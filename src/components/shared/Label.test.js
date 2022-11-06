import { render, screen } from '@testing-library/react';
import ThemeProvider from '../../ThemeProvider';
import themes from '../../themes';
import Label from './Label';

beforeEach(() => {
  render(
    <ThemeProvider>
      <Label text={'test'} />
    </ThemeProvider>
  );
});

describe('Label', () => {
  test('renders successfully', () => {
    const label = screen.getByText(/test/);
    expect(label).toBeInTheDocument();
  });

  test('has correct color', () => {
    const label = screen.getByText(/test/);
    // Default theme is light
    expect(label).toHaveStyle({ color: themes.light.fgPrimary });
  });
});
