import ThemeProvider from './ThemeProvider';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col w-full h-screen">
        <Header />
        <Main />
      </div>
    </ThemeProvider>
  );
}

export default App;
