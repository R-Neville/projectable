import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useThemeContext } from '../context-providers/ThemeProvider';
import { useAuthContext } from '../context-providers/AuthProvider';
import Section from './shared/Section';
import Fieldset from './shared/Fieldset';
import Input from './shared/Input';
import Label from './shared/Label';
import FormActions from './shared/FormActions';
import FormError from './shared/FormError';

function RegisterContent() {
  const initialFormState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const { theme } = useThemeContext();
  const { loggedIn, register } = useAuthContext();
  const [formState, setFormState] = useState(initialFormState);
  const [registrationError, setRegistrationError] = useState('');

  const clearForm = (event) => {
    event.preventDefault();
    const form = document.querySelector('.register-form');
    if (form) {
      form.reset();
    }
  };

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const validateForm = async (event) => {
    event.preventDefault();
    const form = document.querySelector('.register-form');
    const { username, email, password, confirmPassword } = formState;
    if (form) {
      if (
        username.length === 0 ||
        email.length === 0 ||
        password.length === 0
      ) {
        setRegistrationError('Required fields are empty');
      } else if (confirmPassword !== password) {
        setRegistrationError("Passwords don't match");
      } else {
        const error = await register(
          username,
          email,
          password,
          confirmPassword
        );
        if (error) {
          setRegistrationError(error);
        }
      }
    }
  };

  if (loggedIn) {
    return <Navigate replace to="/dashboard/tasks"></Navigate>;
  }

  return (
    <div className="flex flex-col p-4">
      <Section>
        <form className="register-form w-full" onSubmit={validateForm}>
          {registrationError && (
            <FormError
              text={registrationError}
              onDismiss={() => setRegistrationError('')}
            />
          )}
          <Fieldset>
            <Label text="Username" />
            <Input type="text" name="username" onChange={onInputChange} />
          </Fieldset>

          <Fieldset>
            <Label text="Email" />
            <Input type="email" name="email" onChange={onInputChange} />
          </Fieldset>
          <Fieldset>
            <Label text="Password" />
            <Input type="password" name="password" onChange={onInputChange} />
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
            actions={[
              { text: 'Clear', onClick: clearForm, type: 'reset' },
              { text: 'Submit', onClick: validateForm, type: 'submit' },
            ]}
          />
          <p style={{ color: theme.fgPrimary }}>
            Already have an account?{' '}
            <Link to="/login" className="underline">
              Login
            </Link>
          </p>
        </form>
      </Section>
    </div>
  );
}

export default RegisterContent;
