import React from 'react';
import { useState } from 'react';
import { createProject } from '../../services/projectsService';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import Section from '../shared/Section';
import Fieldset from '../shared/Fieldset';
import FormActions from '../shared/FormActions';
import Label from '../shared/Label';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';
import FormError from '../shared/FormError';
import showError from '../../utils/showError';

export default function NewProjectModal({ open, onClose, onDone }) {
  const initialFormState = {
    name: '',
    description: '',
  };

  const navigate = useNavigate();

  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState('');

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formState.name.length === 0 || formState.description.length === 0) {
      setFormError('Required fields are empty');
    } else {
      createProject(formState)
        .then((response) => {
          const { data } = response;
          if (data.error) {
            showError(data.error);
          } else {
            navigate(`/project/${data._id}`);
          }
        })
        .catch((error) => {
          showError(error.message);
        });
      onDone();
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
              title="New Project"
              content={
                <form
                  action=""
                  className="register-form  sm:my-8 sm:w-full sm:max-w-lg"
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
                        <Label text=" Project Name" />
                        <Input
                          type="text"
                          name="name"
                          onChange={onInputChange}
                        />
                      </>
                    }
                  />
                  <Fieldset
                    content={
                      <>
                        <Label text="Project Description" />
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