import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import SidebarLink from './shared/SidebarLink';
import Frame from './shared/Frame';
import CardList from './shared/CardList';
import Card from './shared/Card';
import FormModal from './shared/FormModal';
import TasksIconDark from '../assets/icons/tasks-dark.svg';
import TasksIconLight from '../assets/icons/tasks-light.svg';
import ProjectsIconDark from '../assets/icons/projects-dark.svg';
import ProjectsIconLight from '../assets/icons/projects-light.svg';
import SettingsIconDark from '../assets/icons/settings-dark.svg';
import SettingsIconLight from '../assets/icons/settings-light.svg';
import { getAllProjects } from '../services/projectsService';
import showError from '../utils/showError';

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
    title: 'Projects',
    lightSrc: SettingsIconDark,
    darkSrc: SettingsIconLight,
    testID: 'dashboard-settings-tab',
  },
];

function DashboardContent() {
  const [projects, setProjects] = useState([]);
  const [isOpen, setIsOpen] = useState(false)

  const links = linkData.map((linkInfo, i) => {
    return (
      <SidebarLink
        key={i}
        to={linkInfo.to}
        lightSrc={linkInfo.lightSrc}
        darkSrc={linkInfo.darkSrc}
        testID={linkInfo.testID}
      />
    );
  });

  useEffect(() => {
    async function loadProjects() {
      const data = await getAllProjects();
      if (data.error) {
        showError(data.error);
      } else {
        console.log(data)
        setProjects(data.data);
      }
    }
    loadProjects();
  }, [setProjects]);

  const projectCardMenuActions = [
    {
      text: 'test',
      onClick: () => console.log('clicked'),
    },
  ];

  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar links={links}></Sidebar>
      <FormModal
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        Modal
      </FormModal>
      <Routes>
        <Route index element={<Frame title="My Tasks"></Frame>} />
        <Route path="/tasks" element={<Frame title="My Tasks"></Frame>} />
        <Route
          path="/projects"
          element={
            <Frame
              title="My Projects"
              actions={[
                {
                  text: 'New',
                  onClick: () => setIsOpen(true),
                },
              ]}
            >
              <CardList>
                {projects && projects.map((p, i) => {
                  return (
                    <Card
                      key={i}
                      title={p.name}
                      content={<span>Test Content</span>}
                      menuActions={projectCardMenuActions}
                    />
                  );
                })}
              </CardList>
            </Frame>
          }
        />
        <Route path="/settings" element={<Frame title="My Settings"></Frame>} />
      </Routes>
    </div>
  );
}

export default DashboardContent;
