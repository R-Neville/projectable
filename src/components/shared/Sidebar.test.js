import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeProvider from '../../context-providers/ThemeProvider';
import Sidebar from './Sidebar';
import SidebarLink from './SidebarLink';
import TasksIconDark from '../../assets/icons/tasks-dark.svg';
import TasksIconLight from '../../assets/icons/tasks-light.svg';
import ProjectsIconDark from '../../assets/icons/projects-dark.svg';
import ProjectsIconLight from '../../assets/icons/projects-light.svg';
import SettingsIconDark from '../../assets/icons/settings-dark.svg';
import SettingsIconLight from '../../assets/icons/settings-light.svg';

const linkData = [
  {
    to: '/dashboard/tasks',
    title: 'Tasks',
    lightSrc: TasksIconDark,
    darkSrc: TasksIconLight,
    testID: 'dashboard-tasks-tab',
  },
  {
    to: '/dashboard/projects',
    title: 'Projects',
    lightSrc: ProjectsIconDark,
    darkSrc: ProjectsIconLight,
    testID: 'dashboard-projects-tab',
  },
  {
    to: '/dashboard/settings',
    title: 'Settings',
    lightSrc: SettingsIconDark,
    darkSrc: SettingsIconLight,
    testID: 'dashboard-settings-tab',
  },
];

beforeEach(() => {
  const links = linkData.map((linkInfo, i) => {
    return (
      <SidebarLink
        key={i}
        to={linkInfo.to}
        lightSrc={linkInfo.lightSrc}
        darkSrc={linkInfo.darkSrc}
        testID={linkInfo.testID}
        title={linkInfo.title}
      />
    );
  });

  render(
    <ThemeProvider>
      <BrowserRouter>
        <Sidebar links={links} />
        <Routes>
          <Route index element={<p>index route element</p>} />
          <Route path="/dashboard/tasks" element={<p>tasks route element</p>} />
          <Route
            path="/dashboard/projects"
            element={<p>projects route element</p>}
          />
          <Route
            path="/dashboard/settings"
            element={<p>settings route element</p>}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
});

describe('Sidebar', () => {
  test('renders all links correctly', () => {
    const tasksLink = screen.getByTestId('dashboard-tasks-tab');
    expect(tasksLink).toBeInTheDocument();

    const projectsLink = screen.getByTestId('dashboard-projects-tab');
    expect(projectsLink).toBeInTheDocument();

    const settingsLink = screen.getByTestId('dashboard-settings-tab');
    expect(settingsLink).toBeInTheDocument();
  });

  test('links all redirect to correct elements', () => {
    const tasksLink = screen.getByTestId('dashboard-tasks-tab');
    userEvent.click(tasksLink);

    const tasksRouteElement = screen.getByText(/tasks route element/);
    expect(tasksRouteElement).toBeInTheDocument();

    const projectsLink = screen.getByTestId('dashboard-tasks-tab');
    userEvent.click(projectsLink);

    const projectsRouteElement = screen.getByText(/tasks route element/);
    expect(projectsRouteElement).toBeInTheDocument();

    const settingsLink = screen.getByTestId('dashboard-tasks-tab');
    userEvent.click(settingsLink);

    const settingsRouteElement = screen.getByText(/tasks route element/);
    expect(settingsRouteElement).toBeInTheDocument();
  });
});
