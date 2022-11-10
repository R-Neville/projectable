import { Link } from 'react-router-dom';
import { useThemeContext } from '../../context-providers/ThemeProvider';
import DotMenu from './DotMenu';

function Card({ title, content, menuActions, onClick, viewHref, danger }) {
  const { theme } = useThemeContext();

  const onViewLinkMouseEnter = (event) => {
    event.target.style.textDecoration = 'underline';
  };

  const onViewLinkMouseLeave = (event) => {
    event.target.style.textDecoration = 'none';
  };

  return (
    <div
      className={`flex flex-col my-4 rounded ${onClick && 'cursor-pointer'}`}
      style={
        danger
          ? {
              backgroundColor: theme.bgError,
              border: `1px solid ${theme.fgError}`,
            }
          : { backgroundColor: theme.bgPrimary }
      }
      onClick={onClick}
    >
      <div className="flex justify-between p-3">
        <h3
          className="text-3xl"
          style={danger ? { color: theme.fgError } : { color: theme.fgPrimary }}
        >
          {viewHref ? (
            <Link
              to={viewHref}
              onMouseEnter={onViewLinkMouseEnter}
              onMouseLeave={onViewLinkMouseLeave}
            >
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>
        {menuActions && <DotMenu actions={menuActions} />}
      </div>
      {content && <div className="p-3">{content}</div>}
    </div>
  );
}

export default Card;
