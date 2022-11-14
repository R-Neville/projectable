import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import Section from '../shared/Section';
import Fieldset from '../shared/Fieldset';
import Label from '../shared/Label';
import Input from '../shared/Input';
import TextArea from '../shared/TextArea';
import FormActions from '../shared/FormActions';
import FormError from '../shared/FormError';
import { updateTask } from '../../services/tasksService';
import { showError } from '../../utils/helpers';

function EditTaskModal({ open, onClose, onDone, task }) {
  const { theme } = useThemeContext();

  const initialFormState = {
    brief: '',
    description: '',
  };
  const [formState, setFormState] = useState(initialFormState);
  const [formError, setFormError] = useState(null);

  if (!open) return null;

  const onFormInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const formActions = [
    {
      text: 'Cancel',
      type: 'reset',
      onClick: () => {
        onClose();
      },
    },
    {
      text: 'Submit',
      type: 'submit',
      onClick: (event) => {
        event.preventDefault();
        if (
          formState.brief.length === 0 &&
          formState.description.length === 0
        ) {
          setFormError('Required fields are empty');
        } else {
          updateTask(task.projectId, task._id, formState)
            .then((response) => {
              const { data } = response;
              if (data.error) {
                showError(new Error(data.error));
              } else {
                onClose();
                onDone();
              }
            })
            .catch((error) => {
              showError(error);
            });
        }
      },
    },
  ];

  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-opacity-75 z-50 transition-opacity"
        style={{ backgroundColor: '#000A' }}
      >
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full sm:items-center sm:p-0">
            <Section title="Edit Task">
              <form className="py-4 w-full">
                {formError && (
                  <FormError
                    text={formError}
                    onDismiss={() => setFormError(null)}
                  />
                )}
                <Fieldset>
                  <Label text="Brief" />
                  <p className="italic" style={{ color: theme.fgHighlight }}>
                    {`"${task.brief}"`}
                  </p>
                  <Input
                    name="brief"
                    type="text"
                    onChange={onFormInputChange}
                  />
                </Fieldset>
                <Fieldset>
                  <Label text="Description" />
                  <p className="italic" style={{ color: theme.fgHighlight }}>
                    {`"${task.description}"`}
                  </p>
                  <TextArea name="description" onChange={onFormInputChange} />
                </Fieldset>
                <FormActions actions={formActions} />
              </form>
            </Section>
          </div>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}

export default EditTaskModal;
