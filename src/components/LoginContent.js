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

function LoginContent() {
  const { theme } = useThemeContext();
  const { loggedIn, login } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);

  const clearForm = (event) => {
    event.preventDefault();
    const form = document.querySelector('.login-form');
    if (form) {
      form.reset();
    }
  };

  const onInputChange = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  const validateForm = async (event) => {
    event.preventDefault();
    const form = document.querySelector('.login-form');
    if (form) {
      if (email.length === 0 || password.length === 0) {
        setLoginError('Required fields are empty');
      } else {
        const error = await login(email, password);
        if (error) {
          setLoginError(error);
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
          <form className="login-form w-full" onSubmit={validateForm}>
            {loginError && (
              <FormError
                text={loginError}
                onDismiss={() => setLoginError('')}
              />
            )}
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
            <FormActions
              actions={[
                { text: 'Clear', onClick: clearForm, type: 'reset' },
                { text: 'Submit', onClick: validateForm, type: 'submit' },
              ]}
            />
            <p style={{ color: theme.fgPrimary }}>
              Don't have an account?{' '}
              <Link to="/register" className="underline">
                Register
              </Link>
            </p>
          </form>
        }
      />
    </div>
  );
}

export default LoginContent;
