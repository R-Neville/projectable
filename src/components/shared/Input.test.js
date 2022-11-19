import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../../context-providers/ThemeProvider';
import Input from './Input';

const onChange = jest.fn();

beforeEach(() => {
  render(
    <ThemeProvider>
      <Input
        name={'test'}
        type={'text'}
        onChange={onChange}
        placeholder="test"
        value="test"
      />
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

  test('has correct value', () => {
    const input = screen.getByRole('textbox');
    expect(input.value).toBe('test');
  });

  test('has correct placeholder', () => {
    const input = screen.getByRole('textbox');
    expect(input.placeholder).toBe('test');
  });

  test('onChange is called when "change" event is fired', () => {
    const input = screen.getByRole('textbox');
    fireEvent.change(input);
    setTimeout(() => {
      expect(onChange).toBeCalled();
    });
  });

  test('onChange is called when "input" event is fired', () => {
    const input = screen.getByRole('textbox');
    fireEvent.input(input);
    setTimeout(() => {
      expect(onChange).toBeCalled();
    });
  });
});
