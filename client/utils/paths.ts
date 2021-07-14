export const paths = {
  landing: '/',
  home: '/home',
  messages: '/messages',
  settings: '/settings',
  saved: '/saved',
  // profile: 'profile',
  profile: ({ profileId }: { profileId: string }) => {
    return {
      href: `/profile/${profileId}`,
    }
  },
  post: ({ postId }: { postId: string }) => {
    return {
      href: `/post/${postId}`,
    }
  },
}
