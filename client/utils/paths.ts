export const paths = {
  landing: '/',
  login: '/login',
  signup: '/signup',
  home: '/home',
  messages: '/messages',
  settings: '/settings',
  saved: '/saved',
  notifications: '/notifications',
  // profile: 'profile',
  profile: ({ username }: { username: string }) => {
    return {
      href: `/profile/${username}`,
    }
  },
  post: ({ postId }: { postId: string }) => {
    return {
      href: `/post/${postId}`,
    }
  },
}
