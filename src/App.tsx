import React, { useState } from 'react';
import './App.css';
import Router from 'src/routes/index';
import ThemeModeProvider from './context/theme-mode-provider';
import { ThemeModeContext } from 'src/context/theme-mode-context';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

function App() {
  const [themeMode, setThemeMode] = useState<boolean>(false);
  const queryClient = new QueryClient();

  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools />
        <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
          <ThemeModeProvider>
            <Router />
          </ThemeModeProvider>
        </ThemeModeContext.Provider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default App;
