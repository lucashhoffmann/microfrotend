import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers/app-providers';
import BillingRouter from './router/router';

export function App() {
  return (
    <BrowserRouter basename="/billing">
      <AppProviders>
        <BillingRouter />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
