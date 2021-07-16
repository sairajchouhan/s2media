export const paths = {
  landing: '/',
  home: '/home',
  messages: '/messages',
  settings: '/settings',
  saved: '/saved',
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
