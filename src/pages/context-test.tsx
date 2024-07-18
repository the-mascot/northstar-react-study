import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeModeContext } from '../context/theme-mode-context';
import { Button } from '@mui/material';

export default function ContextTest() {
  const { themeMode, setThemeMode } = useContext(ThemeModeContext);

  return (
    <Box>
      <Typography variant="h4" sx={{ margin: 3 }}>
        Context API 테스트 샘플
      </Typography>
      <Typography variant="h6" sx={{ margin: 3 }} color="gray">
        모드 변경 버튼을 누르면 useContext로 App.tsx에 SettingProvider 가 제공해주는 context 를 읽어와
      </Typography>
      <Typography variant="h6" sx={{ margin: 3 }} color="gray">
        theme setting을 변경한다.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setThemeMode(!themeMode)}
        sx={{ ml: 3 }}
      >
        모드 변경
      </Button>
    </Box>
  );
}
