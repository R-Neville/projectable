import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProject } from '../../services/projectsService';
import { createPortal } from 'react-dom';
import Section from './Section';
import Fieldset from './Fieldset';
import FormActions from './FormActions';
import Label from './Label';
import Input from './Input';
import TextArea from './TextArea';
import FormError from './FormError';

export default function FormModal({ open, onClose }) {
  const initialFormState = {
    name: '',
    description: '',
  };

  const navigate = useNavigate();
  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState('');

  const onInputChange = (event) => {
    console.log(event.target.value)
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formState.name.length === 0 || formState.description.length === 0) {
      setFormError('Required fields are empty');
    } else {
      createProject({ ...formState })
        .then((project) => {
          // set state here, Context maybe?
          console.log(project)
          navigate('/dashboard/projects');
        })
        .catch((error) => {
          setFormError(error.message);
        });
    }
  };

  if (!open) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full sm:items-center sm:p-0">
            <Section
              content={
                <form action="" className="register-form  sm:my-8 sm:w-full sm:max-w-lg">
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
