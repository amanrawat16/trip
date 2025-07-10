import { AuthProvider } from '@/contexts/AuthContext';
import { FeedbackProvider } from '@/contexts/FeedbackContext';
import FeedbackMessage from '@/components/FeedbackMessage';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <FeedbackProvider>
        <Component {...pageProps} />
        <FeedbackMessage />
      </FeedbackProvider>
    </AuthProvider>
  );
}
 