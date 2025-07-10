import { createContext, useContext, useState } from 'react';

const FeedbackContext = createContext();

export function FeedbackProvider({ children }) {
  const [message, setMessage] = useState(null);

  const showMessage = (text, type = 'success') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const showError = (text) => {
    showMessage(text, 'error');
  };

  const showSuccess = (text) => {
    showMessage(text, 'success');
  };

  const value = {
    message,
    showMessage,
    showError,
    showSuccess
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within a FeedbackProvider');
  }
  return context;
} 