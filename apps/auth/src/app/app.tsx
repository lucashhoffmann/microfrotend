import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers/app-providers';
import AuthRouter from './router/router';

export function App() {
  return (
    <BrowserRouter basename="/auth">
      <AppProviders>
        <AuthRouter />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
