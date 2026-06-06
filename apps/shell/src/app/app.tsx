import { AppProviders } from './providers/app-providers';
import { ShellRouter } from './router/router';

export function App() {
  return (
    <AppProviders>
      <ShellRouter />
    </AppProviders>
  );
}

export default App;
