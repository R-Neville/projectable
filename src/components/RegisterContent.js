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
  const { theme } = useThemeContext();
  const { loggedIn, register } = useAuthContext();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const clearForm = (event) => {
    event.preventDefault();
    const form = document.querySelector('.register-form');
    if (form) {
      form.reset();
    }
  };

  const onInputChange = (event) => {
    switch (event.target.name) {
      case 'username':
        setUsername(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'confirmPassword':
        setConfirmPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const validateForm = async (event) => {
    event.preventDefault();
    const form = document.querySelector('.register-form');
    if (form) {
      if (
        username.length === 0 ||
        email.length === 0 ||
        password.length === 0
      ) {
        setRegistrationError('Required fields are empty');
      } else if (confirmPassword !== password) {
        setRegistrationError('Passwords don\'t match')
      }else {
        const error = await register(username, email, password, confirmPassword);
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
      <Section
        content={
          <form className="register-form w-full">
            {registrationError && (
              <FormError
                text={registrationError}
                onDismiss={() => setRegistrationError('')}
              />
            )}
            <Fieldset
              content={
                <>
                  <Label text="Username" />
                  <Input type="text" name="username" onChange={onInputChange} />
                </>
              }
            />
            <Fieldset
              content={
                <>
                  <Label text="Email" />
                  <Input type="email" name="email" onChange={onInputChange} />
                </>
              }
            />
            <Fieldset
              content={
                <>
                  <Label text="Password" />
                  <Input
                    type="password"
                    name="password"
                    onChange={onInputChange}
                  />
                </>
              }
            />
            <Fieldset
              content={
                <>
                  <Label text="Confirm Password" />
                  <Input
                    type="password"
                    name="confirmPassword"
                    onChange={onInputChange}
                  />
                </>
              }
            />
            <FormActions
              actions={[
                { text: 'Clear', onClick: clearForm },
                { text: 'Submit', onClick: validateForm },
              ]}
            />
            <p style={{ color: theme.fgPrimary }}>
              Already have an account?{' '}
              <Link to="/login" className="underline">
                Login
              </Link>
            </p>
          </form>
        }
      />
    </div>
  );
}

export default RegisterContent;
