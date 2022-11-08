import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './context-providers/ThemeProvider';
import AuthProvider from './context-providers/AuthProvider';
import Header from './components/Header';
import Main from './components/Main';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex flex-col w-full h-screen">
          <BrowserRouter>
            <Header />
            <Main />
          </BrowserRouter>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
