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
  getTaskComments,
  createTaskComment,
} from '../../services/commentsService';
import { dateFromTimestamp, showError } from '../../utils/helpers';
import DotMenu from '../shared/DotMenu';
import FormActions from '../shared/FormActions';
import FormError from '../shared/FormError';
import { apiErrors } from '../../config/axiosConfig';

function TaskModal({ open, task, onClose }) {
  const { theme } = useThemeContext();
  const { logout, userManager } = useAuthContext();
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [formError, setFormError] = useState('');

  const loadComments = useCallback(() => {
    if (task) {
      getTaskComments(task._id)
        .then((response) => {
          const { data } = response;
          console.log(data);
          if (data.error) {
            showError(new Error(data.error));
          } else {
            setComments(data);
          }
        })
        .catch((error) => {
          if (error.code === apiErrors.BAD_REQUEST) {
            logout();
          }
          showError(error);
        });
    }
  }, [task, logout]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  if (!open) return null;

  const buildCommentMenuActions = (comment) => {
    const actions = [];

    if (userManager.user === comment.userId) {
      return [
        ...actions,
        {
          text: 'Delete',
          onClick: () => {
            deleteTaskComment(comment._id)
              .then((response) => {
                const { data } = response;
                if (data.error) {
                  showError(new Error(data.error));
                } else {
                  loadComments();
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
      ]
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
            <Section title={task.brief}>
              <SectionP text={task.description} />
              <div className="flex justify-end items-center w-full">
                <Link
                  className="p-3 w-28 rounded m-3"
                  style={{
                    backgroundColor: theme.bgHighlight,
                    color: theme.fgHighlight,
                  }}
                  to={`/project/${task.projectId}`}
                  onClick={onClose}
                >
                  View Project
                </Link>
                <button
                  className="p-3 w-28 rounded m-3"
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
            {comments.length > 0 ? (
              comments.map((comment, i) => {
                return (
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
                    <span className="ml-auto" style={{ color: theme.fgHighlight }}>
                      {dateFromTimestamp(comment.createdAt)}
                    </span>
                  </div>
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
                <FormActions
                  actions={[
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
                          createTaskComment(task._id, commentContent)
                            .then((response) => {
                              const { data } = response;
                              if (data.error) {
                                showError(new Error(data.error));
                              } else {
                                event.target.closest('form').reset();
                                loadComments();
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
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default TaskModal;
