import { BrowserRouter } from 'react-router-dom';
import { AppProviders } from './providers/app-providers';
import WalletRouter from './router/router';

export function App() {
  return (
    <BrowserRouter basename="/wallet">
      <AppProviders>
        <WalletRouter />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
