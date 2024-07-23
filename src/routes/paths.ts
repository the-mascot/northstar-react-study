export const paths = {
  home: '/',
  login: '/login',
  post: {
    list: '/posts',
    detail: '/post/:id',
    write: '/post/write',
    edit: '/post/edit/:id'
  },
  test: {
    useEffect: '/test/effect',
    render: '/test/render',
    useMemo: '/test/memo',
    useCallback: '/test/callback',
    context: '/test/context',
    useQuery: '/test/query'
  }
}
