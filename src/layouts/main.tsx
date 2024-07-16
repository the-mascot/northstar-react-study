// @mui
import Box, { BoxProps } from '@mui/material/Box';
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_DESKTOP: 80,
  H_DESKTOP_OFFSET: 80 - 16
};

export const NAV = {
  W_VERTICAL: 280,
  W_MINI: 88
};

export default function Main({ children, sx, ...other }: BoxProps) {
    return (
      <Box
        component="main"
        sx={{
          minHeight: 1,
          display: 'flex',
          flexDirection: 'column',
          pt: `${HEADER.H_MOBILE + 24}px`,
          pb: 10
        }}
      >
        {children}
      </Box>
  );
}
