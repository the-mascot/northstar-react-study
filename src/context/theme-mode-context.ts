import { createContext } from 'react';

type ThemeModeType = {
  themeMode: boolean;
  setThemeMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ThemeModeContext = createContext({} as ThemeModeType);
