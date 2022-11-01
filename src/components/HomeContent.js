import { Link } from 'react-router-dom';
import { useThemeContext } from '../ThemeProvider';
import Section from './Section';
import SectionP from './SectionP';

function HomeContent() {
  const { theme } = useThemeContext();
  const linkClassName = "p-3 w-28 rounded m-3 text-center";
  const linkTheme = { backgroundColor: theme.bgAccent, color: theme.fgAccent };
  return (
    <div>
      <Section
        title={'Collaborate With Ease'}
        content={
          <>
            <SectionP
              text={`Projectable is a lightweight project management 
          applications that assists teams, of any size and 
          type, to collaborate and track the progress of 
          their work. It is a free, open source alternative 
          that puts user experience first!`}
            />
            <div className="flex flex-row justify-evenly items-center">
              <Link to="/login" className={linkClassName} style={linkTheme}>
                Login
              </Link>
              <Link to="/register" className={linkClassName} style={linkTheme}>
                Register
              </Link>
            </div>
          </>
        }
      />
    </div>
  );
}

export default HomeContent;
