import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context-providers/AuthProvider';
import QuestionModal from './modals/QuestionModal';
import Section from './shared/Section';
import Fieldset from './shared/Fieldset';
import Input from './shared/Input';
import TextArea from './shared/TextArea';
import Label from './shared/Label';
import FormActions from './shared/FormActions';
import FormError from './shared/FormError';
import { buildAxiosErrorHandler, showError } from '../utils/helpers';
import { updateProject, deleteProject } from '../services/projectsService';

export default function ProjectSettings({ project }) {
  const projectId = useCallback(() => project._id, [project]);
  const oldName = useCallback(() => project.name, [project]);
  const oldDescription = useCallback(() => project.description, [project]);
  const initialFormState = {
    name: oldName(),
    description: oldDescription(),
  };
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  const [formState, setFormState] = useState(initialFormState);
  const [updateFormError, setUpdateFormError] = useState('');
  const [showDeleteProject, setShowDeleteProject] = useState(false);

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const updatedProject = {
      name: oldName(),
      description: oldDescription(),
    };
    const { name, description } = formState;
    if (name.length === 0 && description.length === 0) {
      return setUpdateFormError('You have not updated anything');
    }

    if (name.length > 0) {
      updatedProject.name = name;
    }

    if (description.length > 0) {
      updatedProject.description = description;
    }

    updateProject(projectId(), updatedProject)
      .then((response) => {
        const { data } = response;
        if (data && data.error) {
          showError(new Error(data.error));
        } else {
          document.body.dispatchEvent(new CustomEvent('set-project-name', {
            bubbles: true,
            detail: {
              name: data.name,
            }
          }));
        }
      })
      .catch(buildAxiosErrorHandler(logout));
  };

  const onDeleteProjectModalConfirm = () => {
    setShowDeleteProject(false);
    deleteProject(projectId())
      .then((response) => {
        const { data } = response;
        if (data && data.error) {
          showError(new Error(data.error));
        } else {
          navigate('/dashboard');
        }
      })
      .catch(buildAxiosErrorHandler(logout));
  };

  return (
    <>
      <QuestionModal
        open={showDeleteProject}
        message={`Delete '${project && project.name}' project?`}
        onCancel={() => setShowDeleteProject(false)}
        onConfirm={onDeleteProjectModalConfirm}
      />
      <Section title="Update Project Details">
        <form className="w-full" onSubmit={onSubmit}>
          {updateFormError && (
            <FormError
              text={updateFormError}
              onDismiss={() => setUpdateFormError('')}
            />
          )}
          <Fieldset>
            <Label text="Name" />
            <Input
              type="text"
              name="name"
              value={formState.name}
              onChange={onInputChange}
            />
          </Fieldset>
          <Fieldset>
            <Label text="Description" />
            <TextArea
              name="description"
              value={formState.description}
              onChange={onInputChange}
            />
          </Fieldset>
          <FormActions
            actions={[{ text: 'Update', onClick: onSubmit, type: 'submit' }]}
          />
        </form>
        <Section />
        <Section className="flex justify-items-start" title="Delete Project">
          <Fieldset>
            <Label text="Once you delete this project there is no going back" />
          </Fieldset>
          <button
            className="p-3 w-30 rounded m-3 bg-red-500 hover:bg-red-700 text-white"
            onClick={() => {
              setShowDeleteProject(true);
            }}
          >
            Delete Project
          </button>
        </Section>
      </Section>
    </>
  );
}
