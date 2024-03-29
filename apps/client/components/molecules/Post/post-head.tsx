import { formatDistanceToNow } from 'date-fns'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useMutation } from 'react-query'
import { axios } from '../../../config/axios'
import { useAuth } from '../../../context/authContext'
import { useToast } from '../../../context/toastContext'
import { LeftNavIconComp } from '../../../types'
import { PostWithBaseUser } from '../../../types/post'
import { paths } from '../../../utils/paths'
import { Avatar } from '../../atoms/Avatar/avatar'
import { Button } from '../../atoms/Button'
import { IconButton } from '../../atoms/IconButton'
import { DeleteIcon } from '../../icons/DeleteIcon'
import { Menu } from '../Menu'
import { Model } from '../Model'
import { ModelFoot } from '../Model/model-foot'
import { useQueryClient } from 'react-query'
import { useRouter } from 'next/router'
import { GET_POSTS_FOR_HOME, GET_PROFILE_USER_POSTS } from '../../../utils/querykeysAndPaths'

export interface PostHeadProps {
  icon: LeftNavIconComp
  post: PostWithBaseUser
}

export const PostHead = ({ post: { user, id, createdAt }, icon }: PostHeadProps) => {
  const queryClient = useQueryClient()
  const { pathname, query } = useRouter()
  const toast = useToast()
  const { rqUser: authUser, getIdToken } = useAuth()
  const cancelRef = useRef<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState(false)

  const postDeleteMutation = useMutation(
    async (id: string) => {
      const idToken = await getIdToken()
      const res = await axios.delete(`/post/${id}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
      return res.data
    },
    {
      onSuccess: async (_data) => {
        setOpen(false)
        toast({ type: 'success', message: 'Post deleted successfully' })
        if (pathname.startsWith('/profile')) {
          const queryKey = GET_PROFILE_USER_POSTS.queryKey((query as any).index[0])
          await queryClient.invalidateQueries(queryKey)
        }
        if (pathname.startsWith('/home')) {
          await queryClient.invalidateQueries(GET_POSTS_FOR_HOME.queryKey())
        }
      },
      onError: (_err) => {
        toast({ type: 'error', message: 'Something went wrong :( Try again' })
      },
    }
  )

  const handleDeletePost = async () => {
    postDeleteMutation.mutate(id)
  }

  return (
    <div>
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <Link href={paths.profile({ username: user.username }).href}>
            <a className="flex items-center pt-1">
              <Avatar src={user.avatar} w="w-10" h="h-10" alt={user.username} />
            </a>
          </Link>
          <div className="flex flex-col pl-2">
            <Link href={paths.profile({ username: user.username }).href}>
              <a>
                <div className="flex items-center">
                  <div className="text-base font-bold text-gray-800 cursor-pointer hover:underline">
                    {user?.profile.displayName}
                  </div>
                  <div className="mx-1 text-base font-normal text-gray-600">·</div>
                  <p className="text-base font-normal text-gray-500 ">@{user?.username}</p>
                </div>
              </a>
            </Link>
            <p className="text-xs text-gray-500">
              {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        <div className="">
          <Menu
            activationButton={() => (
              <div className="transform translate-x-1">
                <IconButton w="w-4" h="h-4" hoverBgColor="bg-gray-100" icon={icon} />
              </div>
            )}
          >
            {authUser?.uid === user.uid ? (
              <Menu.Item
                className="text-red-500"
                activeClassName="hover:bg-red-50"
                icon={DeleteIcon}
                onClick={() => setOpen(true)}
              >
                Delete
              </Menu.Item>
            ) : (
              <Menu.Item
                onClick={() => toast({ message: 'Post reported successfully', type: 'success' })}
              >
                Report
              </Menu.Item>
            )}
          </Menu>
        </div>
      </div>

      <Model open={open} toggleOpen={() => setOpen((open) => !open)} initialFoucsRef={cancelRef}>
        <Model.Head title="Delete Post" toggleOpen={() => setOpen((open) => !open)} />
        <Model.Body>
          <p className="my-3 text-md">
            🔴 Deleting the post will delete all the likes, comments and replies related to this
            post
          </p>
        </Model.Body>
        <ModelFoot>
          <div className="flex justify-end">
            <Button
              ref={cancelRef}
              variant="outline"
              onClick={() => setOpen(!open)}
              colorScheme="gray"
            >
              Cancel
            </Button>
            <span className="mx-2"></span>
            <Button
              loading={postDeleteMutation.isLoading}
              onClick={() => handleDeletePost()}
              variant="solid"
              colorScheme="red"
            >
              Delete
            </Button>
          </div>
        </ModelFoot>
      </Model>
    </div>
  )
}
