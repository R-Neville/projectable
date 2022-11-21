import React from 'react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import Section from '../shared/Section';
import Fieldset from '../shared/Fieldset';
import FormActions from '../shared/FormActions';
import Label from '../shared/Label';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';
import FormError from '../shared/FormError';
import { showError, buildAxiosErrorHandler } from '../../utils/helpers';
import { createTask } from '../../services/tasksService';
import { useAuthContext } from '../../context-providers/AuthProvider';
import { useThemeContext } from '../../context-providers/ThemeProvider'

export default function NewTaskModal({ open, onClose, projectId, onDone }) {
  const initialFormState = {
    brief: '',
    description: '',
    priority: '',
    deadline: '',
  };

  const { logout } = useAuthContext();
  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState('');
  const { theme } = useThemeContext();
   
  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
    console.log(formState)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.brief.length === 0 || formState.description.length === 0) {
      setFormError('Required fields are empty');
    } else {
      createTask(projectId, formState)
        .then((response) => {
          const { data } = response;
          if (data && data.error) {
            showError(new Error(data.error));
          } else {
            onDone();
          }
        })
        .catch(
          buildAxiosErrorHandler(logout, () => {
            onClose();
          })
        );
    }
  };

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-opacity-75 z-50 transition-opacity"
        style={{ backgroundColor: '#000A' }}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full sm:items-center sm:p-0">
            <Section title="New Task">
              <form
                action=""
                className="register-form sm:my-8 sm:w-full sm:max-w-lg"
              >
                {formError && (
                  <FormError
                    text={formError}
                    onDismiss={() => setFormError('')}
                  />
                )}
                <Fieldset>
                  <Label text="Task Brief" />
                  <Input type="text" name="brief" onChange={onInputChange} />
                </Fieldset>
                <Fieldset>
                  <Label text="Task Description" />
                  <TextArea
                    type="text"
                    name="description"
                    onChange={onInputChange}
                  />
                </Fieldset>
                <Fieldset>
                  <Label text="Priority" />
                  <select
                    className="my-2 bg-transparent border-solid border-1"
                    name="priority"
                    style={{
                      backgroundColor: theme.bgHighlight,
                      color: theme.fgHighlight,
                    }}
                    value={formState.priority}
                    onChange={onInputChange}
                  >
                    <option value="high">high</option>
                    <option value="medium">medium</option>
                    <option value="low">low</option>
                  </select>
                </Fieldset>
                <Fieldset>
                  <input
                    type="date"
                    name="deadline"
                    onChange={onInputChange}
                    className="my-2 bg-transparent border-solid border-1"
                    style={{
                      backgroundColor: theme.bgHighlight,
                      color: theme.fgHighlight,
                    }}
                  />
                </Fieldset>
                <FormActions
                  actions={[
                    { text: 'Cancel', onClick: onClose, type: 'reset' },
                    { text: 'Submit', onClick: handleSubmit, type: 'submit' },
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
