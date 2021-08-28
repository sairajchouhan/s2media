export const commentAndReplyUser = {
  select: {
    uid: true,
    avatar: true,
    username: true,
    profile: {
      select: {
        displayName: true,
      },
    },
  },
}
