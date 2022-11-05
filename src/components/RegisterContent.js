import { Link } from 'react-router-dom';
import { useThemeContext } from '../ThemeProvider';
import Section from './Section';
import Fieldset from './Fieldset';
import Input from './Input';
import Label from './Label';
import FormActions from './FormActions';

function RegisterContent() {
  const { theme } = useThemeContext();

  function clearForm(event) {
    event.preventDefault();
    const form = document.querySelector('.register-form');
    if (form) {
      form.reset();
    }
  }

  function validateForm(event) {
    event.preventDefault();
    const form = document.querySelector('.register-form');
    if (form) {
      console.log('validate form');
    }
  }

  return (
    <div className="flex flex-col p-4">
      <Section
        content={
          <form className="register-form w-full">
            <Fieldset
              content={
                <>
                  <Label text="Username" htmlFor="username" />
                  <Input type="text" name="username" />
                </>
              }
            />
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
            <Fieldset
              content={
                <>
                  <Label text="Confirm Password" htmlFor="confirm-password" />
                  <Input type="password" name="confirm-password" />
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
              <Link to="/login" className="underline">Login</Link>
            </p>
          </form>
        }
      />
    </div>
  );
}

export default RegisterContent;
