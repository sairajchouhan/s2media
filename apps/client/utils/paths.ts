export const paths = {
  landing: '/',
  login: '/login',
  signup: '/signup',
  home: '/home',
  search: '/search',
  messages: '/messages',
  settings: '/settings',
  notifications: '/notifications',
  saved: '/saved',
  profile: ({
    username,
    query,
  }: {
    username: string
    query?: { like?: boolean; save?: boolean }
  }) => {
    let href = { value: `/profile/${username}` }

    if (query?.like) {
      href.value += `/liked`
    }
    if (query?.save) {
      href.value += `/saved`
    }
    return {
      href: href.value,
    }
  },
  post: ({ postId }: { postId: string }) => {
    return {
      href: `/post/${postId}`,
    }
  },
}
