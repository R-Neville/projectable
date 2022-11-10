import { useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import SidebarLink from './shared/SidebarLink';
import Frame from './shared/Frame';
import TasksIconDark from '../assets/icons/tasks-dark.svg';
import TasksIconLight from '../assets/icons/tasks-light.svg';
import SettingsIconDark from '../assets/icons/settings-dark.svg';
import SettingsIconLight from '../assets/icons/settings-light.svg';
import { deleteProject, getProject } from '../services/projectsService';
import showError from '../utils/showError';
import CardList from './shared/CardList';
import Card from './shared/Card';
import QuestionModal from './modals/QuestionModal';

function ProjectContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onDeleteModalConfirm = () => {
    setShowDeleteModal(false);
    deleteProject(id)
      .then((response) => {
        const { data } = response;
        if (data.error) {
          showError(data.error);
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        showError(error.message);
      });
  };

  const onDeleteModalCancel = () => {
    setShowDeleteModal(false);
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

  function loadProject() {
    getProject(id)
    .then((response) => {
      const { data } = response;
      if (data.error) {
        showError(data.error);
      } else {
        setProject(data);
      }
    })
    .catch((error) => {
      showError(error.message);
    });
  }


  useEffect(() => {
    loadProject();
  });

  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar links={links}></Sidebar>
      <Routes>
        <Route index element={<Frame title="Unassigned Tasks"></Frame>} />
        <Route
          path="/unassigned"
          element={<Frame title="Unassigned Tasks"></Frame>}
        />
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
