import { useRoutes } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import Layout from '../layouts/layout';
import Home from '../pages/home';
import { UseEffectTest } from '../pages/use-effect-test';

export default function Router() {
  return useRoutes([
    {
      path: paths.home,
      element: (
        <Layout>
          <Home />
        </Layout>
      )
    },
    {
      path: paths.test.useEffect,
      element: (
        <Layout>
          <UseEffectTest />
        </Layout>
      )
    }
  ]);
}
