//! USER
export const GET_PROFILE_USER = {
  queryKey: (username: string) => {
    return ['user', username]
  },
  path: (username: string) => {
    if (username && username.trim() !== '') {
      return `/user/${username}`
    }
    return ''
  },
}

export const GET_PROFILE_USER_POSTS = {
  queryKey: (username: string) => {
    return ['user', 'post', username]
  },
  path: (username: string, queryString: string) => {
    return `/user/${username}/post${queryString}`
  },
}

//! POST
export const GET_ONE_POST = {
  queryKey: (postId: string) => {
    return ['post', postId]
  },
  path: (postId: string) => {
    return `/post/${postId}`
  },
}

export const CREATE_POST = {
  path: '/post',
}

//! COMMENT
export const GET_COMMENTS_FOR_POST = {
  queryKey: (postId: string | undefined) => {
    return ['post', { id: postId, comment: true }]
  },
  path: (postId: string | undefined, cursor: string) => {
    return `/post/comment/${postId}?cursor=${cursor}`
  },
}

export const POST_COMMENT = {
  path: (postId: string) => `/post/comment/${postId}`,
}

export const EDIT_COMMENT = {
  path: (postId: string, commentId: string) => `/post/comment/${postId}/${commentId}`,
}

export const DELETE_COMMENT = {
  path: (postId: string, commentId: string) => {
    return `/post/comment/${postId}/${commentId}`
  },
}

export const CREATE_COMMENT_LIKE = {
  path: (postId: string, commentId: string) => {
    return `/post/comment/like/${postId}/${commentId}`
  },
}

//! REPLY
export const GET_REPLIES_FOR_COMMENT = {
  queryKey: (commentId: string | undefined) => {
    return ['reply', { commentId }]
  },
  path: (postId: string, commentId: string, cursor: string) => {
    return `/post/comment/reply/${postId}/${commentId}?cursor=${cursor}`
  },
}

export const POST_REPLY = {
  path: (postId: string, commentId: string | undefined) =>
    `/post/comment/reply/${postId}/${commentId}`,
}

export const EDIT_REPLY = {
  path: (postId: string, commentId: string, replyId: string) =>
    `/post/comment/reply/${postId}/${commentId}/${replyId}`,
}

export const DELETE_REPLY = {
  path: (postId: string, commentId: string, replyId: string) =>
    `/post/comment/reply/${postId}/${commentId}/${replyId}`,
}

export const CREATE_REPLY_LIKE = {
  path: (postId: string, replyId: string) => {
    return `/post/reply/like/${postId}/${replyId}`
  },
}

//! FOLLOW
export const FOLLOW_USER = {
  path: (username: string) => {
    return `/user/follow/${username}`
  },
}

//! USER FOLLOWERS AND FOLLOWING
export const GET_USER_FOLLOWERS = {
  queryKey: (username: string) => {
    return ['user', 'followers', username]
  },
  path: (username: string, cursor: string) => {
    return `/user/${username}/followers?cursor=${cursor}`
  },
}
export const GET_USER_FOLLOWING = {
  queryKey: (username: string) => {
    return ['user', 'following', username]
  },
  path: (username: string, cursor: string) => {
    return `/user/${username}/following?cursor=${cursor}`
  },
}

//! SETTINGS
export const CHANGE_USER_PROFILE_TYPE = {
  path: '/settings/profileType',
}
