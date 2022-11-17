import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThemeProvider from '../../context-providers/ThemeProvider';
import Frame from './Frame';

describe('Frame', () => {
  test('renders without errors when no props are passed', () => {
    render(
      <ThemeProvider>
        <Frame></Frame>
      </ThemeProvider>
    );
    const frame = screen.getByTestId('frame');
    expect(frame).toBeInTheDocument();
  });

  test('renders title when passed as prop', () => {
    render(
      <ThemeProvider>
        <Frame title="test"></Frame>
      </ThemeProvider>
    );
    const title = screen.getByText(/test/);
    expect(title).toBeInTheDocument();
  });

  test('renders children', () => {
    render(
      <ThemeProvider>
        <Frame>
          <p>child-1</p>
          <p>child-2</p>
        </Frame>
      </ThemeProvider>
    );
    const child1 = screen.getByText(/child-1/);
    expect(child1).toBeInTheDocument();
    const child2 = screen.getByText(/child-2/);
    expect(child2).toBeInTheDocument();
  });

  test('renders actions', () => {
    render(
      <ThemeProvider>
        <Frame
          actions={[
            {
              text: 'action-1',
              onClick: null,
            },
            {
              text: 'action-2',
              onClick: null,
            },
          ]}
        ></Frame>
      </ThemeProvider>
    );

    const action1 = screen.getByText(/action-1/);
    expect(action1).toBeInTheDocument();
    const action2 = screen.getByText(/action-2/);
    expect(action2).toBeInTheDocument();
  });

  test("actions' onClick handles are fired when clicked", () => {
    const onClick1 = jest.fn();
    const onClick2 = jest.fn();

    render(
      <ThemeProvider>
        <Frame
          actions={[
            {
              text: 'action-1',
              onClick: onClick1,
            },
            {
              text: 'action-2',
              onClick: onClick2,
            },
          ]}
        ></Frame>
      </ThemeProvider>
    );

    const action1 = screen.getByText(/action-1/);
    const action2 = screen.getByText(/action-2/);
    userEvent.click(action1);
    userEvent.click(action2);
    expect(onClick1).toBeCalled();
    expect(onClick2).toBeCalled();
  });
});
