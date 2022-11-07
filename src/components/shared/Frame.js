import { useThemeContext } from '../../ThemeProvider';

function Frame({ title, children }) {
  const { theme } = useThemeContext();

  return (
    <div className="flex flex-col p-4 w-full h-full">
      <h2
        className="w-full text-4xl"
        style={{
          borderBottom: `2px solid ${theme.fgAccent}`,
          color: theme.fgAccent,
        }}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

export default Frame;
