import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ErrorBoundary } from '@/app/components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider
        router={router}
        fallbackElement={null}
      />
    </ErrorBoundary>
  );
}

export default App;
