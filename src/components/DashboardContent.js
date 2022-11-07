import { Routes, Route } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import SidebarLink from './shared/SidebarLink';
import Frame from './shared/Frame';
import TasksIconDark from '../assets/icons/tasks-dark.svg';
import TasksIconLight from '../assets/icons/tasks-light.svg';
import ProjectsIconDark from '../assets/icons/projects-dark.svg';
import ProjectsIconLight from '../assets/icons/projects-light.svg';
import SettingsIconDark from '../assets/icons/settings-dark.svg';
import SettingsIconLight from '../assets/icons/settings-light.svg';

const linkData = [
  {
    to: '/dashboard/tasks',
    title: 'Tasks',
    lightSrc: TasksIconDark,
    darkSrc: TasksIconLight,
    testID: "dashboard-tasks-tab",
  },
  {
    to: '/dashboard/projects',
    title: 'Projects',
    lightSrc: ProjectsIconDark,
    darkSrc: ProjectsIconLight,
    testID: "dashboard-projects-tab",
  },
  {
    to: '/dashboard/settings',
    title: 'Projects',
    lightSrc: SettingsIconDark,
    darkSrc: SettingsIconLight,
    testID: "dashboard-settings-tab",
  },
];

function DashboardContent() {
  const links = linkData.map((linkInfo, index) => {
    return (
      <SidebarLink
        key={index}
        to={linkInfo.to}
        lightSrc={linkInfo.lightSrc}
        darkSrc={linkInfo.darkSrc}
        testID={linkInfo.testID}
      />
    );
  });

  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar links={links}></Sidebar>
      <Routes>
        <Route index element={<Frame title="My Tasks"></Frame>} />
        <Route path="/tasks" element={<Frame title="My Tasks"></Frame>} />
        <Route path="/projects" element={<Frame title="My Projects"></Frame>} />
        <Route path="/settings" element={<Frame title="My Settings"></Frame>} />
      </Routes>
    </div>
  );
}

export default DashboardContent;
