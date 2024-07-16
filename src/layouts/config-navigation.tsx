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
        title: 'useEffect Test',
        path: paths.test.useEffect
      },
    ],
    []
  );

  return data;
}
