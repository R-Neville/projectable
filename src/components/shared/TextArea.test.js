import { screen, render } from '@testing-library/react';
import { fireEvent } from '@testing-library/react';
import TextArea from './TextArea';
import ThemeProvider from '../../context-providers/ThemeProvider';

const onChange = jest.fn();

beforeEach(() => {
  render(
    <ThemeProvider>
      <TextArea name="test" value="test" onChange={onChange} />
    </ThemeProvider>
  );
});

describe('TextArea', () => {
  test('renders successfully', () => {
    const textArea = screen.getByRole('textbox');
    expect(textArea).toBeInTheDocument();
  });

  test('has correct name value', () => {
    const textArea = screen.getByRole('textbox');
    expect(textArea.name).toBe('test');
  });

  test('has correct value', () => {
    const textArea = screen.getByRole('textbox');
    expect(textArea.value).toBe('test');
  });

  test('onChange is called when "change" event is fired', () => {
    const textArea = screen.getByRole('textbox');
    fireEvent.change(textArea);
    setTimeout(() => {
      expect(onChange).toBeCalled();
    });
  });

  test('onChange is called when "input" event is fired', () => {
    const textArea = screen.getByRole('textbox');
    fireEvent.input(textArea);
    setTimeout(() => {
      expect(onChange).toBeCalled();
    });
  });
});
