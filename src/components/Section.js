import { useThemeContext } from '../ThemeProvider';

function Section({ title, content }) {
  const { theme } = useThemeContext();
  return (
    <section
      className="flex flex-col items-center p-4 w-full max-w-2xl mr-auto ml-auto mt-4 mb-4 rounded"
      style={{ backgroundColor: theme.bgPrimary }}
    >
      <h2
        className="p-2 w-full border-b text-2xl"
        style={{ borderColor: theme.fgPrimary, color: theme.fgPrimary }}
      >
        {title}
      </h2>
      {content}
    </section>
  );
}

export default Section;
