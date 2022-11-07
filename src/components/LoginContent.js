import { Link, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { useThemeContext } from '../context-providers/ThemeProvider';
import Section from './shared/Section';
import Fieldset from './shared/Fieldset';
import Input from './shared/Input';
import Label from './shared/Label';
import FormActions from './shared/FormActions';

function LoginContent() {
  const { theme } = useThemeContext();
  const [loginSuccess, setLoginSuccess] = useState(false);

  function clearForm(event) {
    event.preventDefault();
    const form = document.querySelector('.login-form');
    if (form) {
      form.reset();
    }
  }

  function validateForm(event) {
    event.preventDefault();
    const form = document.querySelector('.login-form');
    if (form) {
      setLoginSuccess(true);
    }
  }

  if (loginSuccess) {
    return <Navigate replace to="/dashboard/tasks"></Navigate>
  }

  return (
    <div className="flex flex-col p-4">
      <Section
        content={
          <form className="login-form w-full">
            <Fieldset
              content={
                <>
                  <Label text="Email" />
                  <Input type="email" name="email" />
                </>
              }
            />
            <Fieldset
              content={
                <>
                  <Label text="Password" />
                  <Input type="password" name="password" />
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
