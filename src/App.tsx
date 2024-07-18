import React, { useState } from 'react';
import './App.css';
import Router from 'src/routes/index';
import ThemeModeProvider from './context/theme-mode-provider';
import { ThemeModeContext } from 'src/context/theme-mode-context';

function App() {
  const [themeMode, setThemeMode] = useState<boolean>(false);
  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      <ThemeModeProvider>
        <Router />
      </ThemeModeProvider>
    </ThemeModeContext.Provider>
  );
}

export default App;
