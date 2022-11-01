import { Link } from 'react-router-dom';
import { useThemeContext } from '../ThemeProvider';
import Section from './Section';
import Fieldset from './Fieldset';
import Input from './Input';
import Label from './Label';
import FormActions from './FormActions';

function LoginContent() {
  const { theme } = useThemeContext();

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
      console.log('validate form');
    }
  }

  return (
    <>
      <Section
        content={
          <form className="login-form w-full">
            <Fieldset
              content={
                <>
                  <Label text="Email" htmlFor="email" />
                  <Input type="email" name="email" />
                </>
              }
            />
            <Fieldset
              content={
                <>
                  <Label text="Password" htmlFor="password" />
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
    </>
  );
}

export default LoginContent;
