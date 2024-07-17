import Main from './main';
import Header from './header';
import Nav from 'src/layouts/nav';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
    return (
      <>
        <Header />

        <Nav />

        <Main>{children}</Main>
      </>
    );
}
