import { useContext, useMemo } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { ThemeModeContext } from './theme-mode-context';

type ThemeModeProviderProps = {
  children: React.ReactNode
}

export default function ThemeModeProvider({ children }: ThemeModeProviderProps) {
  const { themeMode } = useContext(ThemeModeContext);

  const theme = useMemo(() => createTheme({
    palette: {
      mode: themeMode ? 'dark' : 'light',
    },
  }), [themeMode]);

  return <ThemeProvider theme={theme}><CssBaseline />{children}</ThemeProvider>;
}
