import { useThemeContext } from '../../context-providers/ThemeProvider';

function Page({ title, content, date }) {
  const { theme } = useThemeContext();
  return (
    <main
      className="flex flex-col grow"
      style={{ backgroundColor: theme.bgAccent }}
    >
      <div
        className="flex justify-between"
        style={{ backgroundColor: theme.bgPrimary, color: theme.fgPrimary }}
      >
        <h1 className="p-4  text-4xl text-center">{title}</h1>
        {date}
      </div>
      {content}
    </main>
  );
}

export default Page;
