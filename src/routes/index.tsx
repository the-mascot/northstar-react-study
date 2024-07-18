import { useRoutes } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import Layout from '../layouts/layout';
import { UseMemoTest } from '../pages/use-memo-test';
import { UseCallbackTest } from '../pages/use-callback-test';
import RenderTest from '../pages/render-test';
import UseEffectTest from 'src/pages/use-effect-test';
import Home from 'src/pages/home';
import ContextTest from '../pages/context-test';
//const Home = lazy(() => import('src/pages/home'));
//const UseEffectTest = lazy(() => import('src/pages/use-effect-test'));

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
    },
    {
      path: paths.test.render,
      element: (
        <Layout>
          <RenderTest />
        </Layout>
      )
    },
    {
      path: paths.test.useMemo,
      element: (
        <Layout>
          <UseMemoTest />
        </Layout>
      )
    },
    {
      path: paths.test.useCallback,
      element: (
        <Layout>
          <UseCallbackTest />
        </Layout>
      )
    },
    {
      path: paths.test.context,
      element: (
        <Layout>
          <ContextTest />
        </Layout>
      )
    }
  ]);
}
