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
import { showError } from '../../utils/helpers';
import { createTask } from '../../services/tasksService';

export default function NewTaskModal({ open, onClose, projectId, onDone }) {
  const initialFormState = {
    brief: '',
    description: '',
  };

  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState('');

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.brief.length === 0 || formState.description.length === 0) {
      setFormError('Required fields are empty');
    } else {
      createTask(projectId, formState)
        .then((response) => {
          const { data } = response;
          if (data.error) {
            showError(new Error(data.error));
          } else {
            onDone();
          }
        })
        .catch((error) => {
          showError(error);
          onClose();
        });
    }
  };

  if (!open) return null;

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-opacity-75 transition-opacity"
        style={{ backgroundColor: '#000A' }}
      >
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full sm:items-center sm:p-0">
            <Section
              title="New Task"
              content={
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
                  <Fieldset
                    content={
                      <>
                        <Label text="Task Brief" />
                        <Input
                          type="text"
                          name="brief"
                          onChange={onInputChange}
                        />
                      </>
                    }
                  />
                  <Fieldset
                    content={
                      <>
                        <Label text="Task Description" />
                        <TextArea
                          type="text"
                          name="description"
                          onChange={onInputChange}
                        />
                      </>
                    }
                  />
                  <FormActions
                    actions={[
                      { text: 'Cancel', onClick: onClose, type: 'reset' },
                      { text: 'Submit', onClick: handleSubmit, type: 'submit' },
                    ]}
                  />
                </form>
              }
            />
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
