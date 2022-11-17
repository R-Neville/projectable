import React, { useState } from 'react';
import { useThemeContext } from '../context-providers/ThemeProvider';
import { useAuthContext } from '../context-providers/AuthProvider';
import Section from './shared/Section';
import Fieldset from './shared/Fieldset';
import Input from './shared/Input';
import Label from './shared/Label';
import FormActions from './shared/FormActions';
import FormError from './shared/FormError';
import { useEffect } from 'react';

export default function UserSettings() {
  const initialFormState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { theme } = useThemeContext();
  const [formState, setFormState] = useState(initialFormState);
  const [registrationError, setRegistrationError] = useState('');
  const { userManager, logout } = useAuthContext();

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  useEffect(()=>{

  }, [])

  const onSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Section>
        <form className="w-full" onSubmit={validateForm}>
          {registrationError && (
            <FormError
              text={registrationError}
              onDismiss={() => setRegistrationError('')}
            />
          )}
          <Fieldset>
            <Label text="Username" />
            <Input
              type="text"
              name="username"
              value={initialFormState.username}
              onChange={onInputChange}
            />
          </Fieldset>

          <Fieldset>
            <Label text="Email" />
            <Input
              type="email"
              name="email"
              value={initialFormState.email}
              onChange={onInputChange}
            />
          </Fieldset>
          <Fieldset>
            <Label text="Password" />
            <Input
              type="password"
              name="password"
              value={initialFormState.password}
              onChange={onInputChange}
            />
          </Fieldset>
          <Fieldset>
            <Label text="Confirm Password" />
            <Input
              type="password"
              name="confirmPassword"
              onChange={onInputChange}
            />
          </Fieldset>
          <FormActions
            actions={[{ text: 'Submit', onClick: onSubmit, type: 'submit' }]}
          />
        </form>
      </Section>
    </>
  );
}
