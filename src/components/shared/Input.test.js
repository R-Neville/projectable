import { render, screen } from '@testing-library/react';
import ThemeProvider from '../../context-providers/ThemeProvider';
import themes from '../../themes';
import Input from './Input';

beforeEach(() => {
  render(
    <ThemeProvider>
      <Input name={'test'} type={'text'} />
    </ThemeProvider>
  );
});

describe('Input', () => {
  test('renders successfully', () => {
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('has correct name value', () => {
    const input = screen.getByRole('textbox');
    expect(input.name).toBe('test');
  });

  test('has correct type value', () => {
    const input = screen.getByRole('textbox');
    expect(input.type).toBe('text');
  });

  test('has correct color and background color', () => {
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle({
      color: themes.light.fgHighlight,
      'background-color': themes.light.bgHighlight,
    });
  });
});
