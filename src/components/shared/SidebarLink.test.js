import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider, {
  useThemeContext,
} from '../../context-providers/ThemeProvider';
import SidebarLink from './SidebarLink';
import TasksIconDark from '../../assets/icons/tasks-dark.svg';
import TasksIconLight from '../../assets/icons/tasks-light.svg';

const TestComponent = () => {
  const { toggleTheme } = useThemeContext();
  return (
    <button
      data-testid="test-toggle-theme"
      onClick={() => {
        toggleTheme();
      }}
    ></button>
  );
};

describe('SidebarLink', () => {
  test('renders correct icon when theme is toggled', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <TestComponent></TestComponent>
          <SidebarLink
            to="/test"
            testID="test-link"
            title="test"
            darkSrc={TasksIconDark}
            lightSrc={TasksIconLight}
          ></SidebarLink>
          <Routes>
            <Route index element={<p>index route element</p>} />
            <Route path="/test" element={<p>test route element</p>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );

    const img = screen.getByRole('img');
    expect(img.src).toBe(`http://localhost/${TasksIconLight}`);

    const toggleThemeButton = screen.getByTestId('test-toggle-theme');
    userEvent.click(toggleThemeButton);

    expect(img.src).toBe(`http://localhost/${TasksIconDark}`);
  });

  test('redirects to correct route when clicked', () => {
    render(
      <ThemeProvider>
        <BrowserRouter>
          <TestComponent></TestComponent>
          <SidebarLink
            to="/test"
            testID="test-link"
            title="test"
            darkSrc={TasksIconDark}
            lightSrc={TasksIconLight}
          ></SidebarLink>
          <Routes>
            <Route index element={<p>index route element</p>} />
            <Route path="/test" element={<p>test route element</p>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );

    const indexRouteElement = screen.getByText(/index route element/);
    expect(indexRouteElement).toBeInTheDocument();

    const link = screen.getByTestId('test-link');
    userEvent.click(link);

    const testRouteElement = screen.getByText(/test route element/);
    expect(testRouteElement).toBeInTheDocument();
  });
});
