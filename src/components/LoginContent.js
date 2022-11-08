import { Link, Navigate } from 'react-router-dom';
import { useThemeContext } from '../context-providers/ThemeProvider';
import { useAuthContext } from '../context-providers/AuthProvider';
import Section from './shared/Section';
import Fieldset from './shared/Fieldset';
import Input from './shared/Input';
import Label from './shared/Label';
import FormActions from './shared/FormActions';

function LoginContent() {
  const { theme } = useThemeContext();
  const { loggedIn, login } = useAuthContext();

  const clearForm = (event) => {
    event.preventDefault();
    const form = document.querySelector('.login-form');
    if (form) {
      form.reset();
    }
  }

  const validateForm = async (event) => {
    event.preventDefault();
    const form = document.querySelector('.login-form');
    if (form) {
      await login();
    }
  }

  if (loggedIn) {
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
