import { screen, render } from '@testing-library/react';
import SectionP from './SectionP';
import ThemeProvider from '../../context-providers/ThemeProvider';

describe('SectionP', () => {
  test('renders without text-center class when center prop is not passed', () => {
    render(
      <ThemeProvider>
        <SectionP text="test" />
      </ThemeProvider>
    );

    const sectionP = screen.getByText(/test/);
    expect(sectionP).not.toHaveClass('text-center');
  });

  test('renders with text-center class when center prop is passed', () => {
    render(
      <ThemeProvider>
        <SectionP text="test" center />
      </ThemeProvider>
    );

    const sectionP = screen.getByText(/test/);
    expect(sectionP).toHaveClass('text-center')
  });
});
