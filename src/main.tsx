import ReactDOM from 'react-dom/client';
import { AppContextProvider } from '@/components/app-context-provider';

import { App } from '@/app/App';
import { ThemeProvider } from './components/theme-provider';

const rootElement = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootElement).render(
  <AppContextProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </AppContextProvider>,
);
