import { useThemeContext } from '../ThemeProvider';

function Page({ title, content }) {
  const { theme } = useThemeContext();
  return (
    <main
      className="flex flex-col grow"
      style={{ backgroundColor: theme.bgAccent }}
    >
      <h1
        className="p-4 w-full text-4xl text-center"
        style={{ backgroundColor: theme.bgPrimary, color: theme.fgPrimary }}
      >
        {title}
      </h1>
      {content}
    </main>
  );
}

export default Page;
