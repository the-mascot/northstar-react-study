import React, { useState } from 'react';
import './App.css';
import Router from 'src/routes/index';
import ThemeModeProvider from './context/theme-mode-provider';
import { ThemeModeContext } from 'src/context/theme-mode-context';
import { RecoilRoot } from 'recoil';

function App() {
  const [themeMode, setThemeMode] = useState<boolean>(false);
  return (
    <RecoilRoot>
      <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
        <ThemeModeProvider>
          <Router />
        </ThemeModeProvider>
      </ThemeModeContext.Provider>
    </RecoilRoot>
  );
}

export default App;
