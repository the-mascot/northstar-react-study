import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { useNavData } from './config-navigation';
import { useNavigate } from 'react-router-dom';

export default function Nav() {
  const navData = useNavData();
  const navigate = useNavigate();

  const handleOnClick = (path: string) => {
    navigate(path);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {navData.map((menu) => (
              <Button
                key={menu.path}
                color="inherit"
                sx={{ textTransform: 'none' }}
                onClick={() => handleOnClick(menu.path)}
              >{menu.title}</Button>
            ))}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
