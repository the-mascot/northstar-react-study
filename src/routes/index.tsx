import { useRoutes } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import Layout from '../layouts/layout';
import Home from '../pages/home';
import { UseEffectTest } from '../pages/use-effect-test';
import { UseMemoTest } from '../pages/use-memo-test';
import { UseCallbackTest } from '../pages/use-callback-test';
import RenderTest from '../pages/render-test';

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
  ]);
}
