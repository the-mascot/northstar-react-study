import Main from './main';
import Header from './header';
import Nav from 'src/layouts/nav';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
      <Box>
        <Header />

        <Nav />

        <Main>{children}</Main>
      </Box>
    );
}
