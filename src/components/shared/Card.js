import { useThemeContext } from '../../context-providers/ThemeProvider';
import DotMenu from './DotMenu';

function Card({ title, content, menuActions, onClick }) {
  const { theme } = useThemeContext();

  return (
    <div
      className="flex flex-col my-4"
      style={{ backgroundColor: theme.bgPrimary }}
      onClick={onClick}
    >
      <div className="flex justify-between p-3">
        <h3 className="text-3xl" >{title}</h3>
        {menuActions && <DotMenu actions={menuActions} />}
      </div>
      <div className="p-3">{content}</div>
    </div>
  );
}

export default Card;
