import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers/app-providers';
import AnalyticsRouter from './router/router';

export function App() {
  return (
    <BrowserRouter basename="/analytics">
      <AppProviders>
        <AnalyticsRouter />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
