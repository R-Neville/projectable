import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import SidebarLink from './shared/SidebarLink';
import Frame from './shared/Frame';
import TasksIconDark from '../assets/icons/tasks-dark.svg';
import TasksIconLight from '../assets/icons/tasks-light.svg';
import SettingsIconDark from '../assets/icons/settings-dark.svg';
import SettingsIconLight from '../assets/icons/settings-light.svg';
import { deleteProject, getProject } from '../services/projectsService';
import { showError, dateFromTimestamp } from '../utils/helpers';
import CardList from './shared/CardList';
import Card from './shared/Card';
import QuestionModal from './modals/QuestionModal';
import NewTaskModal from './modals/NewTaskModal';
import { useThemeContext } from '../context-providers/ThemeProvider';
import { useAuthContext } from '../context-providers/AuthProvider';
import { deleteTask } from '../services/tasksService';
import { apiErrors } from '../config/axiosConfig';
import TaskModal from './modals/TaskModal';

function ProjectContent() {
  const { theme } = useThemeContext();
  const { logout, userManager } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showConfirmDeleteTask, setShowConfirmDeleteTask] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const onDeleteProjectModalConfirm = () => {
    setShowDeleteModal(false);
    deleteProject(id)
      .then((response) => {
        const { data } = response;
        if (data.error) {
          showError(new Error(data.error));
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        if (error.code === apiErrors.BAD_REQUEST) {
          logout();
        }
        showError(error);
      });
  };

  const onNewTaskModalDone = () => {
    loadProject();
    setShowNewTaskModal(false);
  };

  const onDeleteTaskModalConfirm = () => {
    deleteTask(project._id, currentTask._id)
      .then((response) => {
        const { data } = response;
        if (data.error) {
          showError(new Error(data.error));
        } else {
          setCurrentTask(null);
          setShowConfirmDeleteTask(false);
          loadProject();
        }
      })
      .catch((error) => {
        if (error.code === apiErrors.BAD_REQUEST) {
          logout();
        }
        showError(error);
        setCurrentTask(null);
        setShowConfirmDeleteTask(false);
      });
  };

  const linkData = [
    {
      to: `/project/${id}/unassigned`,
      title: 'Unassigned Tasks',
      lightSrc: TasksIconDark,
      darkSrc: TasksIconLight,
      testID: 'project-unassigned-tab',
    },
  ];

  if (project && userManager.user === project.userId) {
    linkData.push({
      to: `/project/${id}/settings`,
      title: 'Project Settings',
      lightSrc: SettingsIconDark,
      darkSrc: SettingsIconLight,
      testID: 'project-settings-tab',
    });
  }

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

  const settingsOptions = [
    {
      title: 'Delete Project',
      danger: true,
      onClick: () => {
        setShowDeleteModal(true);
      },
    },
  ];

  const loadProject = useCallback(() => {
    getProject(id)
      .then((response) => {
        const { data } = response;
        if (data.error) {
          showError(new Error(data.error));
        } else {
          setProject(data);
        }
      })
      .catch((error) => {
        if (error.code === apiErrors.BAD_REQUEST) {
          logout();
        }
        showError(error);
      });
  }, [id, logout]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

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
    if (userManager.user === task.userId) {
      return [
        ...actions,
        {
          text: 'Delete',
          onClick: () => {
            setCurrentTask(task);
            setShowConfirmDeleteTask(true);
          },
        },
      ];
    }

    return actions;
  }

  const unassignedFrame = (
    <Frame
      title="Unassigned Tasks"
      actions={[{ text: 'New', onClick: () => setShowNewTaskModal(true) }]}
    >
      {project && project.tasks.length > 0 ? (
        project.tasks.map((task, i) => {
          return (
            <Card
              key={i}
              title={task.brief}
              content={
                <div className="flex justify-between">
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
          Nothing to show yet
        </p>
      )}
    </Frame>
  );

  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar links={links}></Sidebar>
      <NewTaskModal
        open={showNewTaskModal}
        projectId={project && project._id}
        onClose={() => setShowNewTaskModal(false)}
        onDone={onNewTaskModalDone}
      />
      <QuestionModal
        open={showConfirmDeleteTask}
        message={`Delete task?`}
        onCancel={() => {
          setCurrentTask(null);
          setShowConfirmDeleteTask(false);
        }}
        onConfirm={onDeleteTaskModalConfirm}
      />
      <TaskModal
        open={currentTask && showTaskModal}
        onClose={() => {
          setShowTaskModal(false);
          setCurrentTask(null);
        }}
        taskId={currentTask && currentTask._id}
        projectId={project && project._id}
      />
      <Routes>
        <Route index element={unassignedFrame} />
        <Route path="/unassigned" element={unassignedFrame} />
        {project && userManager.user === project.userId && (
          <Route
            path="/settings"
            element={
              <Frame title="Settings">
                <CardList>
                  {settingsOptions.map((settingsOption, i) => {
                    return (
                      <Card
                        key={i}
                        title={settingsOption.title}
                        danger={settingsOption.danger}
                        onClick={settingsOption.onClick}
                      />
                    );
                  })}
                </CardList>
              </Frame>
            }
          ></Route>
        )}
      </Routes>
      <QuestionModal
        open={showDeleteModal}
        message={`Delete '${project && project.name}' project?`}
        onCancel={() => setShowDeleteModal(false)}
        onConfirm={onDeleteProjectModalConfirm}
      />
    </div>
  );
}

export default ProjectContent;
