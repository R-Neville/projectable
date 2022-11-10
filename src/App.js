import { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './context-providers/ThemeProvider';
import AuthProvider from './context-providers/AuthProvider';
import Header from './components/Header';
import Main from './components/Main';
import ErrorModal from './components/modals/ErrorModal';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const onShowError = (event) => {
    const { message } = event.detail;
    setErrorMessage(message);
    setShowErrorModal(true);
  };

  const onClearError = () => {
    setErrorMessage(null);
    setShowErrorModal(false);
  };

  useEffect(() => {
    document.addEventListener('show-error', onShowError);
    document.addEventListener('clear-error', onClearError);

    return () => {
      document.removeEventListener('show-error', onShowError);
      document.removeEventListener('clear-error', onClearError);
    };
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex flex-col w-full h-screen">
          <BrowserRouter>
            <Header />
            <Main />
          </BrowserRouter>
        </div>
        <ErrorModal open={showErrorModal} message={errorMessage} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
