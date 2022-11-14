import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import SidebarLink from './shared/SidebarLink';
import Frame from './shared/Frame';
import CardList from './shared/CardList';
import Card from './shared/Card';
import NewProjectModal from './modals/NewProjectModal';
import TasksIconDark from '../assets/icons/tasks-dark.svg';
import TasksIconLight from '../assets/icons/tasks-light.svg';
import ProjectsIconDark from '../assets/icons/projects-dark.svg';
import ProjectsIconLight from '../assets/icons/projects-light.svg';
import SettingsIconDark from '../assets/icons/settings-dark.svg';
import SettingsIconLight from '../assets/icons/settings-light.svg';
import { getAllProjects } from '../services/projectsService';
import { showError, dateFromTimestamp } from '../utils/helpers';
import { useThemeContext } from '../context-providers/ThemeProvider';
import { useAuthContext } from '../context-providers/AuthProvider';
import { apiErrors } from '../config/axiosConfig';

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

function DashboardContent() {
  const { theme } = useThemeContext();
  const { logout } = useAuthContext();
  const [projects, setProjects] = useState([]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const navigate = useNavigate();

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

  useEffect(() => {
    getAllProjects()
      .then((response) => {
        const { data } = response;
        if (data.error) {
          showError(new Error(data.error));
        } else {
          setProjects(data);
        }
      })
      .catch((error) => {
        if (error.code === apiErrors.BAD_REQUEST) {
          logout();
        }
        showError(error);
      });
  }, [logout]);

  const buildProjectCardMenuActions = (project) => {
    return [
      {
        text: 'View Project',
        onClick: () => {
          navigate(`/project/${project._id}`);
        },
      },
    ];
  };

  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar links={links}></Sidebar>
      <NewProjectModal
        open={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onDone={() => setShowNewProjectModal(false)}
      >
        Modal
      </NewProjectModal>
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
                  onClick: () => setShowNewProjectModal(true),
                },
              ]}
            >
              <CardList>
                {projects.length > 0 ? (
                  projects.map((p, i) => {
                    return (
                      <Card
                        key={i}
                        title={p.name}
                        menuActions={buildProjectCardMenuActions(p)}
                        content={
                          <>
                            <p
                              className="p-3 pt-0"
                              style={{ color: theme.fgPrimary }}
                            >
                              {p.description}
                            </p>
                            <div className="flex justify-between">
                              <h3 style={{ color: theme.fgPrimary }}>
                                {`@${p.createdBy}`}
                              </h3>
                              <span style={{ color: theme.fgPrimary }}>
                                {dateFromTimestamp(p.createdAt)}
                              </span>
                            </div>
                          </>
                        }
                      />
                    );
                  })
                ) : (
                  <p
                    className="p-4 text-2xl text-center"
                    style={{ color: theme.fgPrimary }}
                  >
                    You don't have any projects yet
                  </p>
                )}
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
