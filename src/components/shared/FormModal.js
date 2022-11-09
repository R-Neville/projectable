import React from 'react';
import { createPortal } from 'react-dom';
import Section from './Section';
import Fieldset from './Fieldset';
import FormActions from './FormActions';
import Label from './Label';
import Input from './Input';
import TextArea from './TextArea';

export default function FormModal({ open, onClose }) {
  if (!open) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full sm:items-center sm:p-0">
            <Section
              content={
                <form
                  action=""
                  className="register-form  sm:my-8 sm:w-full sm:max-w-lg"
                >
                  <Fieldset
                    content={
                      <>
                        <Label text=" Project Name" />
                        <Input type="text" name="name" />
                      </>
                    }
                  />
                  <Fieldset
                    content={
                      <>
                        <Label text="Project Description" />
                        <TextArea type="text" name="description" />
                      </>
                    }
                  ></Fieldset>
                  <FormActions
                    actions={[
                      { text: 'Cancel', onClick: onClose,  type: 'reset' },
                      { text: 'Submit',  type: 'submit' },
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
