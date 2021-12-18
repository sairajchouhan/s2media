import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { Avatar } from '../atoms/Avatar'
import { CircleLoader } from '../atoms/CircleLoader'
import { Search } from '../molecules/Search'

const RightNav = () => {
  const { getIdToken } = useAuth()

  const { isLoading, data } = useQuery(
    ['recommendations', 'follow'],
    async () => {
      const token = await getIdToken()
      const res = await axios.get('/recommendation/new', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return res.data
    },
    {
      refetchOnWindowFocus: false,
    }
  )

  return (
    <div className="">
      <div className="mt-4">
        <Search />
      </div>
      <div className="w-full ">
        <section className="p-4 mt-4 bg-gray-100 bg-opacity-50 rounded-lg">
          <h2 className="mb-2 -mt-2 text-xl font-bold text-gray-700">New to S2Media</h2>
          <main className="flex flex-col ">
            {isLoading ? (
              <CircleLoader />
            ) : (
              data.users.map((user: any) => <NewSignupCard user={user} key={user.uid} />)
            )}
          </main>
        </section>
        <div className="p-4">
          <a href="#" className="mx-1 text-xs text-gray-500 hover:underline">
            Terms of Service{' '}
          </a>
          <a href="#" className="mx-1 text-xs text-gray-500 hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="mx-1 text-xs text-gray-500 hover:underline">
            Cookie Policy
          </a>
          <a href="#" className="text-xs text-gray-500 hover:underline">
            {' '}
            &copy; 2021 S2media{' '}
          </a>
        </div>
      </div>
    </div>
  )
}

const NewSignupCard = ({ user }: any) => {
  const router = useRouter()
  return (
    <div>
      <div className="flex items-center py-3 space-x-3">
        <div className="cursor-pointer" onClick={() => router.push(`/profile/${user.username}`)}>
          <Avatar w="w-10" h="h-10" src={user.avatar} />
        </div>
        <div className="flex flex-wrap items-center justify-between w-full">
          <div
            onClick={() => router.push(`/profile/${user.username}`)}
            className="text-sm font-medium text-gray-800 truncate cursor-pointer"
          >
            {user?.profile?.displayName}
          </div>
          <button
            onClick={() => router.push(`/profile/${user.username}`)}
            className="px-3 py-1 text-xs font-semibold text-white bg-indigo-500 rounded-full "
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  )
}

export default RightNav
