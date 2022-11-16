import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import { useAuthContext } from '../../context-providers/AuthProvider';
import Section from '../shared/Section';
import SectionP from '../shared/SectionP';
import Fieldset from '../shared/Fieldset';
import Label from '../shared/Label';
import TextArea from '../shared/TextArea';
import { useCallback, useEffect, useState } from 'react';
import {
  deleteTaskComment,
  createTaskComment,
  updateTaskComment,
} from '../../services/commentsService';
import { dateFromTimestamp, showError } from '../../utils/helpers';
import DotMenu from '../shared/DotMenu';
import FormActions from '../shared/FormActions';
import FormError from '../shared/FormError';
import { apiErrors } from '../../config/axiosConfig';
import { getTask, updateTask } from '../../services/tasksService';

function TaskModal({ open, taskId, projectId, onClose }) {
  const { theme } = useThemeContext();
  const { logout, userManager } = useAuthContext();
  const [commentContent, setCommentContent] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [formError, setFormError] = useState('');
  const [editFormError, setEditFormError] = useState('');
  const [taskState, setTaskState] = useState(null);
  const [commentId, setCommentId] = useState(null);

  const loadTask = useCallback(() => {
    if (taskId && projectId) {
      getTask(projectId, taskId)
        .then((response) => {
          const { data } = response;
          if (data.error) {
            showError(new Error(data.error));
          } else {
            setTaskState(data);
          }
        })
        .catch((error) => {
          if (error.code === apiErrors.BAD_REQUEST) {
            logout();
          }
          showError(error);
        });
    }
  }, [taskId, projectId, logout]);

  useEffect(() => {
    loadTask();
  }, [loadTask]);

  if (!open) return null;

  const commentFormActions = [
    {
      text: 'Clear',
      type: 'reset',
    },
    {
      text: 'Submit',
      type: 'submit',
      onClick: (event) => {
        event.preventDefault();
        if (commentContent.length === 0) {
          setFormError('Comment is empty');
        } else {
          createTaskComment(taskState.projectId, taskState._id, commentContent)
            .then((response) => {
              const { data } = response;
              if (data.error) {
                showError(new Error(data.error));
              } else {
                setCommentContent('');
                event.target.closest('form').reset();
                loadTask();
              }
            })
            .catch((error) => {
              if (error.code === apiErrors.BAD_REQUEST) {
                logout();
              }
              showError(error);
            });
        }
      },
    },
  ];

  const buildCommentMenuActions = (comment) => {
    const actions = [];

    if (userManager.user === comment.userId) {
      return [
        ...actions,
        {
          text: 'Edit',
          onClick: () => {
            setCommentId(comment._id);
            setEditedContent(comment.content);
          },
        },
        {
          text: 'Delete',
          onClick: () => {
            deleteTaskComment(taskState.projectId, taskState._id, comment._id)
              .then((response) => {
                const { data } = response;
                if (data.error) {
                  showError(new Error(data.error));
                } else {
                  loadTask();
                }
              })
              .catch((error) => {
                if (error.code === apiErrors.BAD_REQUEST) {
                  logout();
                }
                showError(error);
              });
          },
        },
      ];
    }

    return actions;
  };

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-opacity-75 z-50 transition-opacity"
        style={{ backgroundColor: '#000A' }}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex flex-col min-h-full sm:items-center sm:p-0">
            <Section
              title={
                taskState &&
                `${taskState.brief} ${taskState.completed ? '(COMPLETED)' : ''}`
              }
            >
              <SectionP text={taskState && taskState.description} />
              <div className="flex flex-col sm:flex-row justify-end items-center w-full">
                {taskState &&
                  !taskState.completed &&
                  userManager.user === taskState.assignedTo && (
                    <button
                      className="p-3 w-full sm:w-auto rounded m-3"
                      style={{
                        backgroundColor: theme.bgHighlight,
                        color: theme.fgHighlight,
                      }}
                      onClick={() => {
                        updateTask(taskState.projectId, taskState._id, {
                          ...taskState,
                          completed: true,
                        })
                          .then((response) => {
                            const { data } = response;
                            if (data.error) {
                              showError(new Error(data.error));
                            } else {
                              loadTask();
                            }
                          })
                          .catch((error) => {
                            if (error.code === apiErrors.BAD_REQUEST) {
                              logout();
                            }
                            showError(error);
                          });
                      }}
                    >
                      Mark as Complete
                    </button>
                  )}
                <Link
                  className="p-3 w-full sm:w-auto rounded m-3 text-center"
                  style={{
                    backgroundColor: theme.bgHighlight,
                    color: theme.fgHighlight,
                  }}
                  to={`/project/${taskState && taskState.projectId}`}
                  onClick={onClose}
                >
                  View Project
                </Link>
                <button
                  className="p-3 w-full sm:w-auto rounded m-3"
                  style={{
                    backgroundColor: theme.bgHighlight,
                    color: theme.fgHighlight,
                  }}
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </Section>
            {taskState && taskState.comments.length > 0 ? (
              taskState.comments.map((comment, i) => {
                return commentId !== comment._id ? (
                  <div
                    key={i}
                    className="flex flex-col p-3 w-full max-w-2xl rounded my-3"
                    style={{ backgroundColor: theme.bgPrimary }}
                  >
                    <div className="flex justify-between items-center w-full">
                      <h3
                        style={{ color: theme.fgHighlight }}
                      >{`@${comment.createdBy}`}</h3>
                      <DotMenu actions={buildCommentMenuActions(comment)} />
                    </div>
                    <p style={{ color: theme.fgHighlight }}>
                      {comment.content}
                    </p>
                    <span
                      className="ml-auto"
                      style={{ color: theme.fgHighlight }}
                    >
                      {dateFromTimestamp(comment.createdAt)}
                    </span>
                  </div>
                ) : (
                  <Section key={i}>
                    <form className="flex flex-col w-full">
                      {editFormError && (
                        <FormError
                          text={editFormError}
                          onDismiss={() => setEditFormError('')}
                        />
                      )}
                      <Fieldset>
                        <TextArea
                          value={editedContent}
                          onChange={(event) => {
                            setEditedContent(event.target.value);
                          }}
                        />
                      </Fieldset>
                      <FormActions
                        actions={[
                          {
                            text: 'Cancel',
                            type: 'reset',
                            onClick: () => {
                              setEditFormError('');
                              setCommentId(null);
                            },
                          },
                          {
                            text: 'Save',
                            type: 'submit',
                            onClick: (event) => {
                              event.preventDefault();
                              if (editedContent.length === 0) {
                                setEditFormError('Comment empty');
                              } else {
                                updateTaskComment(
                                  projectId,
                                  taskId,
                                  comment._id,
                                  editedContent
                                )
                                  .then((response) => {
                                    const { data } = response;
                                    if (data.error) {
                                      showError(new Error(data.error));
                                    } else {
                                      loadTask();
                                      setEditFormError('');
                                      setEditedContent('');
                                      setCommentId(null);
                                    }
                                  })
                                  .catch((error) => {
                                    if (error.code === apiErrors.BAD_REQUEST) {
                                      logout();
                                    }
                                    showError(error);
                                  });
                              }
                            },
                          },
                        ]}
                      />
                    </form>
                  </Section>
                );
              })
            ) : (
              <Section>
                <SectionP text="No comments yet" center />
              </Section>
            )}
            <Section>
              <form className="w-full">
                {formError && (
                  <FormError
                    text={formError}
                    onDismiss={() => setFormError('')}
                  />
                )}
                <Fieldset>
                  <Label text="New Comment" />
                  <TextArea
                    name="content"
                    onChange={(event) => setCommentContent(event.target.value)}
                  />
                </Fieldset>
                <FormActions actions={commentFormActions} />
              </form>
            </Section>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default TaskModal;
