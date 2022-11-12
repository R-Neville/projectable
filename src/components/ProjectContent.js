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
import { showError } from '../utils/helpers';
import CardList from './shared/CardList';
import Card from './shared/Card';
import QuestionModal from './modals/QuestionModal';
import NewTaskModal from './modals/NewTaskModal';
import { useThemeContext } from '../context-providers/ThemeProvider';

function ProjectContent() {
  const { theme } = useThemeContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  const onDeleteModalConfirm = () => {
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
        showError(error);
      });
  };

  const onDeleteModalCancel = () => {
    setShowDeleteModal(false);
  };

  const onNewTaskModalDone = () => {
    loadProject();
    setShowNewTaskModal(false);
  };

  const onNewTaskModalCancel = () => {
    setShowNewTaskModal(false);
  };

  const linkData = [
    {
      to: `/project/${id}/unassigned`,
      title: 'Unassigned Tasks',
      lightSrc: TasksIconDark,
      darkSrc: TasksIconLight,
      testID: 'project-unassigned-tab',
    },
    {
      to: `/project/${id}/settings`,
      title: 'Project Settings',
      lightSrc: SettingsIconDark,
      darkSrc: SettingsIconLight,
      testID: 'project-settings-tab',
    },
  ];

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
      showError(error);
    });
  }, [id]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

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
              content={<span>{`@${task.createdBy}`}</span>}
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
        onClose={onNewTaskModalCancel}
        onDone={onNewTaskModalDone}
      />
      <Routes>
        <Route index element={unassignedFrame} />
        <Route path="/unassigned" element={unassignedFrame} />
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
      </Routes>
      <QuestionModal
        open={showDeleteModal}
        message={`Delete '${project && project.name}' project???`}
        onCancel={onDeleteModalCancel}
        onConfirm={onDeleteModalConfirm}
      />
    </div>
  );
}

export default ProjectContent;
