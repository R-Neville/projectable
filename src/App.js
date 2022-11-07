import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './context-providers/ThemeProvider';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col w-full h-screen">
        <BrowserRouter>
          <Header />
          <Main />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
