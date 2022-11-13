import React from 'react';
import Frame from './shared/Frame';
import { Link } from 'react-router-dom';
import { useThemeContext } from '../context-providers/ThemeProvider';

export default function NoMatch() {
const { theme } = useThemeContext();

  return (
    <>
      <Frame
        title="There's Nothing Here!"
        children={
          <Link
            className="mt-2"
            style={{ color: theme.fgAccent }}
            to={'/login'}
          >
            Back to Login
          </Link>
        }
      />
    </>
  );
}
