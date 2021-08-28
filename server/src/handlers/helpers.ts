export const commentAndReplyUser = {
  select: {
    avatar: true,
    username: true,
    profile: {
      select: {
        displayName: true,
      },
    },
  },
}
