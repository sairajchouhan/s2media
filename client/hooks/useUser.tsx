import { SessionUser } from '../types/user'

export const useUser = () => {
  // const sessionUser: SessionUser = {
  //   accessToken: session.accessToken,
  //   avatar: session.avatar,
  //   email: session.email,
  //   id: session.id,
  //   username: session.username,
  //   displayName: session.displayName,
  // }
  const tempSessionUser: SessionUser = {
    accessToken: 'mybeautifulaccesstoken',
    avatar:
      'https://images.unsplash.com/photo-1628152371243-c87e0f6fc1c7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    email: 'sairaj2119@gmail.com  ',
    id: 'mybeautifylid',
    username: 'sairaj2119',
    displayName: 'SaiRa',
  }
  return { ...tempSessionUser }
}
