import React, { useState } from 'react';
import { useAuthContext } from '../context-providers/AuthProvider';
import {
  getUserDetails,
  updateUserDetails,
  deleteUserAccount,
} from '../services/userService';
import QuestionModal from './modals/QuestionModal';
import { showError } from '../utils/helpers';
import Section from './shared/Section';
import Fieldset from './shared/Fieldset';
import Input from './shared/Input';
import Label from './shared/Label';
import FormActions from './shared/FormActions';
import FormError from './shared/FormError';
import { useEffect } from 'react';

export default function UserSettings() {
  const initialFormState = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { logout } = useAuthContext();
  const [formState, setFormState] = useState(initialFormState);
  const [updateFormError, setUpdateFormError] = useState('');
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    getUserDetails()
      .then((userRecord) => {
        console.log(userRecord);
        setFormState({
          ...formState,
          displayName: userRecord.data.displayName,
          email: userRecord.data.email,
        });
      })
      .catch((error) => {
        showError(error);
      });
  }, []);

  const onSubmit = async () => {
    const { displayName, email, password, confirmPassword } = formState;
    const filledOutFormInputs = {
      ...(displayName && { displayName: displayName }),
      ...(email && { email: email }),
      ...(password && { password: password }),
      ...(confirmPassword && { confirmPassword: confirmPassword }),
    };
    if (!displayName && !email && !password) {
      setUpdateFormError('You have not updated any of your details');
    } else if (password !== confirmPassword) {
      setUpdateFormError('Passwords do not match');
    } else {
      updateUserDetails(filledOutFormInputs)
        .then((updatedUserRecord) => {

        })
        .catch((error) => {
          showError(error);
        });
    }
  };

  const onDelete = async (event) => {
    event.preventDefault();
    deleteUserAccount()
      .then((deletedUser) => {
        console.log(deletedUser);
        logout();
      })
      .catch((error) => {
        showError(error);
      });
  };

  return (
    <>
      <QuestionModal
        open={showDeleteAccount}
        message={'Are you sure you want to delete your account?'}
        onCancel={() => {
          setShowDeleteAccount(false);
        }}
        onConfirm={onDelete}
      />
      <Section title="Update Username and Email">
        <form className="w-full" onSubmit={onSubmit}>
          {updateFormError && (
            <FormError
              text={updateFormError}
              onDismiss={() => setUpdateFormError('')}
            />
          )}
          <Fieldset>
            <Label text="Username" />
            <Input
              type="text"
              name="displayName"
              value={formState.displayName}
              onChange={onInputChange}
            />
          </Fieldset>
          <Fieldset>
            <Label text="Email" />
            <Input
              type="email"
              name="email"
              value={formState.email}
              onChange={onInputChange}
            />
          </Fieldset>
          <Section title="Change Password" />
          <Fieldset>
            <Label text="New Password" />
            <Input
              type="password"
              name="password"
              value={formState.password}
              onChange={onInputChange}
            />
          </Fieldset>
          <Fieldset>
            <Label text="Confirm New Password" />
            <Input
              type="password"
              name="confirmPassword"
              value={formState.confirmPassword}
              onChange={onInputChange}
            />
          </Fieldset>
          <Section />
          <FormActions
            actions={[{ text: 'Update', onClick: onSubmit, type: 'submit' }]}
          />
        </form>
        <Section />

        <Section className="flex justify-items-start" title="Delete Account">
          <Fieldset>
            <Label text="Once you delete your account there is no going back" />
          </Fieldset>
          <button
            className="p-3 w-30 rounded m-3 bg-red-500 hover:bg-red-700 text-white"
            onClick={() => {
              setShowDeleteAccount(true);
            }}
          >
            Delete Account
          </button>
        </Section>
      </Section>
    </>
  );
}
