import { useThemeContext } from '../../context-providers/ThemeProvider';

function Section({ title, children }) {
  const { theme } = useThemeContext();
  return (
    <section
      className="flex flex-col items-center p-4 w-full max-w-2xl mr-auto ml-auto mt-4 mb-4 rounded"
      style={{ backgroundColor: theme.bgPrimary }}
    >
      {title ? (
        <h2
          className="py-2 w-full border-b text-2xl"
          style={{ borderColor: theme.fgPrimary, color: theme.fgPrimary }}
        >
          {title}
        </h2>
      ) : null}
      {children}
    </section>
  );
}

export default Section;
