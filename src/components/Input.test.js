import { render, screen } from '@testing-library/react';
import ThemeProvider from '../ThemeProvider';
import themes from '../themes';
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
    const input = document.querySelector('input');
    expect(input).toBeInTheDocument();
  });

  test('has correct name value', () => {
    const input = document.querySelector('input');
    expect(input.name).toBe('test');
  });

  test('has correct type value', () => {
    const input = document.querySelector('input');
    expect(input.type).toBe('text');
  });

  test('has correct color and background color', () => {
    const input = document.querySelector('input');
    expect(input).toHaveStyle({
      color: themes.light.fgHighlight,
      'background-color': themes.light.bgHighlight,
    });
  });
});
