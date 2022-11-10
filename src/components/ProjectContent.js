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

function ProjectContent() {
  const { id } = useParams();
  const navigate = useNavigate();

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
      },
    },
  ];

  const [project, setProject] = useState(null);

  useEffect(() => {
    getProject(id)
      .then((response) => {
        const { data } = response;
        if (data.error) {
          showError(data.error);
        } else {
          console.log(data);
          setProject(data);
        }
      })
      .catch((error) => {
        showError(error.message);
      });
  }, [id]);

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
    </div>
  );
}

export default ProjectContent;
