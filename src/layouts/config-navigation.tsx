import { useMemo } from 'react';
// routes
import { paths } from 'src/routes/paths';

export function useNavData() {
  const data = useMemo(
    () => [
      {
        title: 'HOME',
        path: paths.home
      },
      {
        title: 'POSTS',
        path: paths.post.list
      },
      {
        title: 'useEffect Test',
        path: paths.test.useEffect
      },
      {
        title: 'render Test',
        path: paths.test.render
      },
      {
        title: 'useMemo Test',
        path: paths.test.useMemo
      },
      {
        title: 'useCallback Test',
        path: paths.test.useCallback
      },
      {
        title: 'context Test',
        path: paths.test.context
      },
      {
        title: 'useQuery Test',
        path: paths.test.useQuery
      }
    ],
    []
  );

  return data;
}
