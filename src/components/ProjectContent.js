import { useCallback, useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import Sidebar from './shared/Sidebar';
import SidebarLink from './shared/SidebarLink';
import Frame from './shared/Frame';
import TasksIconDark from '../assets/icons/tasks-dark.svg';
import TasksIconLight from '../assets/icons/tasks-light.svg';
import SettingsIconDark from '../assets/icons/settings-dark.svg';
import SettingsIconLight from '../assets/icons/settings-light.svg';
import UserIconDark from '../assets/icons/user-dark.svg';
import UserIconLight from '../assets/icons/user-light.svg';
import CompletedIconDark from '../assets/icons/completed-dark.svg';
import CompletedIconLight from '../assets/icons/completed-light.svg';
import { getProject, removeMember } from '../services/projectsService';
import {
  showError,
  dateFromTimestamp,
  buildAxiosErrorHandler,
} from '../utils/helpers';
import Card from './shared/Card';
import QuestionModal from './modals/QuestionModal';
import NewTaskModal from './modals/NewTaskModal';
import MemberModal from './modals/MemberModal';
import { useThemeContext } from '../context-providers/ThemeProvider';
import { useAuthContext } from '../context-providers/AuthProvider';
import { deleteTask } from '../services/tasksService';
import TaskModal from './modals/TaskModal';
import EditTaskModal from './modals/EditTaskModal';
import AssignTaskModal from './modals/AssignTaskModal';
import ViewMemberModal from './modals/ViewMemberModal';
import ProjectSettings from './ProjectSettings';

function ProjectContent() {
  const { theme } = useThemeContext();
  const { logout, userManager } = useAuthContext();
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [showConfirmDeleteTask, setShowConfirmDeleteTask] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [showEditTaskModal, setShowEditTaskModal] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [showRemoveMemberModal, setShowRemoveMemberModal] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showViewMemberModal, setShowViewMemberModal] = useState(false);

  const onNewTaskModalDone = () => {
    loadProject();
    setShowNewTaskModal(false);
  };

  const onDeleteTaskModalConfirm = () => {
    deleteTask(project._id, currentTask._id)
      .then((response) => {
        const { data } = response;
        if (data && data.error) {
          showError(new Error(data.error));
        } else {
          setCurrentTask(null);
          setShowConfirmDeleteTask(false);
          loadProject();
        }
      })
      .catch(
        buildAxiosErrorHandler(logout, () => {
          setCurrentTask(null);
          setShowConfirmDeleteTask(false);
        })
      );
  };

  const onRemoveMemberModalConfirm = () => {
    removeMember(id, currentMember)
      .then((response) => {
        const { data } = response;
        if (data && data.error) {
          showError(new Error(data.error));
        } else {
          setCurrentMember(null);
          setShowRemoveMemberModal(false);
          loadProject();
        }
      })
      .catch(buildAxiosErrorHandler(logout));
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
      to: `/project/${id}/members`,
      title: 'Project Members',
      lightSrc: UserIconDark,
      darkSrc: UserIconLight,
      testID: 'project-members-tab',
    },
    {
      to: `/project/${id}/completed`,
      title: 'Completed Tasks',
      lightSrc: CompletedIconDark,
      darkSrc: CompletedIconLight,
      testID: 'project-completed-tab',
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

  const loadProject = useCallback(() => {
    getProject(id)
      .then((response) => {
        const { data } = response;
        if (data && data.error) {
          showError(new Error(data.error));
        } else {
          if (data) {
            document.dispatchEvent(
              new CustomEvent('set-project-name', {
                bubbles: true,
                detail: {
                  name: data.name,
                },
              })
            );
          }
          setProject(data);
        }
      })
      .catch(buildAxiosErrorHandler(logout));
  }, [id, logout]);

  useEffect(() => {
    loadProject();

    const showTask = (event) => {
      const { task } = event.detail;
      setCurrentTask(task);
      setShowTaskModal(true);
    };

    document.addEventListener('show-task', showTask);

    return () => {
      document.removeEventListener('show-task', showTask);
    };
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

    if (!task.assigned && !task.completed) {
      actions.push({
        text: 'Assign To',
        onClick: () => {
          setCurrentTask(task);
          setShowAssignModal(true);
        },
      });
    }

    if (userManager.user === task.userId) {
      if (!task.completed) {
        actions.push({
          text: 'Edit',
          onClick: () => {
            setCurrentTask(task);
            setShowEditTaskModal(true);
          },
        });
      }

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
      {project && project.tasks.filter((t) => !t.assignedTo).length > 0 ? (
        project.tasks
          .filter((t) => !t.assignedTo)
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
          Nothing to show yet
        </p>
      )}
    </Frame>
  );

  function buildMemberCardMenuActions(member) {
    const actions = [
      {
        text: 'View Details',
        onClick: () => {
          setCurrentMember(member);
          setShowViewMemberModal(true);
        },
      },
    ];

    if (userManager.user === project.userId) {
      return [
        ...actions,
        {
          text: 'Remove member',
          onClick: () => {
            setCurrentMember(member);
            setShowRemoveMemberModal(true);
          },
        },
      ];
    }

    return actions;
  }

  const membersFrame = (
    <Frame
      title="Project Members"
      actions={[
        {
          text: 'Add',
          onClick: () => {
            setShowMemberModal(true);
          },
        },
      ]}
    >
      {project && project.members.length > 0 ? (
        project.members.map((member, i) => {
          return (
            <Card
              key={i}
              title={member.email}
              menuActions={buildMemberCardMenuActions(member)}
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

  const completedFrame = (
    <Frame title="Completed Tasks">
      {project && project.tasks.filter((t) => t.completed).length > 0 ? (
        project.tasks
          .filter((t) => t.completed)
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
          Nothing to show yet
        </p>
      )}
    </Frame>
  );

  return (
    <div className="flex flex-row w-full h-full">
      <Sidebar links={links}></Sidebar>
      <Routes>
        <Route index element={unassignedFrame} />
        <Route path="/unassigned" element={unassignedFrame} />
        <Route path="/members" element={membersFrame} />
        <Route path="/completed" element={completedFrame} />
        {project && userManager.user === project.userId && (
          <Route
            path="/settings"
            element={<ProjectSettings project={project} />}
          ></Route>
        )}
      </Routes>
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
      <EditTaskModal
        open={currentTask && showEditTaskModal}
        onClose={() => {
          setCurrentTask(null);
          setShowEditTaskModal(false);
        }}
        onDone={() => loadProject()}
        task={currentTask}
      />
      <QuestionModal
        open={currentMember && showRemoveMemberModal}
        message={`Remove ${
          currentMember && currentMember.email
        } from this project?`}
        onCancel={() => {
          setCurrentMember(null);
          setShowRemoveMemberModal(false);
        }}
        onConfirm={onRemoveMemberModalConfirm}
      />
      <AssignTaskModal
        open={currentTask && showAssignModal}
        onClose={() => {
          setCurrentTask(null);
          setShowAssignModal(false);
        }}
        onDone={() => loadProject()}
        project={project}
        task={currentTask}
      />
      <MemberModal
        open={showMemberModal}
        onClose={() => setShowMemberModal(false)}
        projectId={id}
        onDone={() => loadProject()}
      />
      <ViewMemberModal
        open={currentMember && showViewMemberModal}
        onClose={() => {
          setCurrentMember(null);
          setShowViewMemberModal(false);
        }}
        member={currentMember}
        tasks={
          currentMember &&
          project &&
          project.tasks.filter((task) => {
            return task.assignedTo === currentMember.uid && !task.completed;
          })
        }
      />
    </div>
  );
}

export default ProjectContent;
