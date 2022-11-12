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
  const initialFormState = {
    email: '',
    password: '',
  };
  const { theme } = useThemeContext();
  const { loggedIn, login } = useAuthContext();
  const [formState, setFormState] = useState(initialFormState);
  const [loginError, setLoginError] = useState(null);

  const clearForm = (event) => {
    event.preventDefault();
    const form = document.querySelector('.login-form');
    if (form) {
      form.reset();
    }
  };

  const onInputChange = (event) => {
    setFormState({ ...formState, [event.target.name]: event.target.value });
  };

  const validateForm = async (event) => {
    event.preventDefault();
    const { email, password } = formState;
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
      <Section>
        <form className="login-form w-full" onSubmit={validateForm}>
          {loginError && (
            <FormError text={loginError} onDismiss={() => setLoginError('')} />
          )}
          <Fieldset>
            <Label text="Email" />
            <Input type="email" name="email" onChange={onInputChange} />
          </Fieldset>
          <Fieldset>
            <Label text="Password" />
            <Input type="password" name="password" onChange={onInputChange} />
          </Fieldset>
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
      </Section>
    </div>
  );
}

export default LoginContent;
