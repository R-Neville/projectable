import React from 'react';
import { createPortal } from 'react-dom';
import Fieldset from './Fieldset';
import Label from './Label';
import Input from './Input';
import TextArea from './TextArea';

export default function FormModal({ open, onClose }) {
  if (!open) return null;

  return createPortal(
    <>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <section className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
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
              <Fieldset content={<>
              <Label text="Project Description"/>
              <TextArea type="text" name="description"/>
              </>}>
               
              </Fieldset>
              <button
                className="inline-flex rounded-md border border-transparent px-4 py-2 text-base font-medium"
                onClick={onClose}
              >
                submit
              </button>
            </form>
          </section>
        </div>
      </div>
    </>,
    document.getElementById('portal')
  );
}
