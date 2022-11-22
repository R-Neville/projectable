import { useEffect, useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import SidebarLink from './shared/SidebarLink';
import Frame from './shared/Frame';
import CardList from './shared/CardList';
import Card from './shared/Card';
import TaskModal from './modals/TaskModal';
import Notifications from './Notifications';
import NewProjectModal from './modals/NewProjectModal';
import TasksIconDark from '../assets/icons/tasks-dark.svg';
import TasksIconLight from '../assets/icons/tasks-light.svg';
import ProjectsIconDark from '../assets/icons/projects-dark.svg';
import ProjectsIconLight from '../assets/icons/projects-light.svg';
import SettingsIconDark from '../assets/icons/settings-dark.svg';
import SettingsIconLight from '../assets/icons/settings-light.svg';
import { getAllProjects } from '../services/projectsService';
import { deleteTask, getAllAssignedTasks } from '../services/tasksService';
import {
  showError,
  buildAxiosErrorHandler,
  dateFromTimestamp,
} from '../utils/helpers';
import { useThemeContext } from '../context-providers/ThemeProvider';
import { useAuthContext } from '../context-providers/AuthProvider';
import UserSettings from './UserSettings';

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

function DashboardContent({ dryRun }) {
  const { theme } = useThemeContext();
  const { logout, userManager } = useAuthContext();
  const [projects, setProjects] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [currentTask, setCurrentTask] = useState();
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
    !dryRun &&
      getAllProjects()
        .then((response) => {
          const { data } = response;
          if (data && data.error) {
            showError(new Error(data.error));
          } else {
            setProjects(data);
          }
        })
        .catch(buildAxiosErrorHandler(logout));
  }, [logout, dryRun]);

  const loadAssignedTasks = useCallback(() => {
    !dryRun &&
      getAllAssignedTasks()
        .then((response) => {
          const { data } = response;
          if (data && data.error) {
            showError(new Error(data.error));
          } else {
            setAssignedTasks(data);
          }
        })
        .catch(buildAxiosErrorHandler(logout));
  }, [logout, dryRun]);

  useEffect(() => {
    loadAssignedTasks();
  }, [loadAssignedTasks]);

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

  function buildTaskCardMenuActions(task) {
    const actions = [
      {
        text: 'Show Details',
        onClick: () => {
          setCurrentTask(task);
          setShowTaskModal(true);
        },
      },
    ];

    if (task.userId === userManager.user) {
      actions.push({
        text: 'Delete',
        onClick: () => {
          deleteTask(task.projectId, task._id)
            .then((response) => {
              const { data } = response;
              if (data && data.error) {
                showError(new Error(data.error));
              } else {
                loadAssignedTasks();
              }
            })
            .catch(buildAxiosErrorHandler(logout));
        },
      });
    }
    return actions;
  }

  const tasksFrame = (
    <>
    <Frame title="My Tasks">
      <Notifications assignedTasks={assignedTasks} />
      <CardList>
        {assignedTasks.filter((t) => !t.completed).length > 0 ? (
          assignedTasks
            .filter((t) => !t.completed)
            .map((task, i) => {
              return (
                <Card
                  key={i}
                  title={task.brief}
                  content={
                    <div className="flex justify-between">
                      <span style={{ color: theme.fgPrimary }}>
                        {task.priority && `priority: ${task.priority}`}
                      </span>
                      <span
                        style={{ color: theme.fgPrimary }}
                      >{`@${task.createdBy}`}</span>
                      <span style={{ color: theme.fgPrimary }}>
                        {dateFromTimestamp(task.createdAt)}
                      </span>
                    </div>
                  }
                  menuActions={buildTaskCardMenuActions(task)}
                />
              );
            })
        ) : (
          <p
            className="p-4 text-2xl text-center"
            style={{ color: theme.fgPrimary }}
          >
            You don't have any assigned tasks
          </p>
        )}
      </CardList>
    </Frame>
    </>
  );

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
      <TaskModal
        open={currentTask && showTaskModal}
        taskId={currentTask && currentTask._id}
        projectId={currentTask && currentTask.projectId}
        onClose={() => {
          setCurrentTask(null);
          setShowTaskModal(false);
        }}
      />

      <Routes>
        <Route index element={tasksFrame} />
        <Route path="/tasks" element={tasksFrame} />
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
        <Route
          path="/settings"
          element={
            <Frame title="My Settings">
              <UserSettings />
            </Frame>
          }
        />
      </Routes>
    </div>
  );
}

export default DashboardContent;
