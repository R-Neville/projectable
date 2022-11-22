import { useThemeContext } from '../../context-providers/ThemeProvider';
import DotMenu from './DotMenu';

function Card({ title, content, menuActions, onClick, danger }) {
  const { theme } = useThemeContext();

  return (
    <div
      className={`flex flex-col w-full my-4 shadow-md rounded ${onClick && 'cursor-pointer'}`}
      style={
        danger
          ? {
              backgroundColor: theme.bgError,
              border: `1px solid ${theme.fgError}`,
            }
          : { backgroundColor: theme.bgPrimary }
      }
      onClick={onClick}
      data-testid="card"
    >
      <div className="flex justify-between p-3">
        <h3
          className="text-3xl"
          style={danger ? { color: theme.fgError } : { color: theme.fgPrimary }}
        >
          {title}
        </h3>
        {menuActions && <DotMenu actions={menuActions} />}
      </div>
      {content && <div className="p-3">{content}</div>}
    </div>
  );
}

export default Card;
