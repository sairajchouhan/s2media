import { useRouter } from 'next/router'
import { FormEvent, useRef } from 'react'
import { useQuery } from 'react-query'
import { axios } from '../../config/axios'
import { useAuth } from '../../context/authContext'
import { useToast } from '../../context/toastContext'
import { Avatar } from '../atoms/Avatar'
import { CircleLoader } from '../atoms/CircleLoader'
import { Search } from '../molecules/Search'

const RightNav = () => {
  const { getIdToken } = useAuth()
  const toast = useToast()
  const feedbackRef = useRef<any>()

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

  const handleFeedbackSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const feedback = feedbackRef.current.value as string
    if (!feedback || feedback.trim() === '') return
    try {
      await fetch('/api/feedback', {
        method: 'POST',
        body: JSON.stringify({ feedback }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      toast({ message: 'Thank you for your valuable feedback!', type: 'success' })
      feedbackRef.current.value = ''
    } catch (err: any) {
      console.log(err.message)
      toast({ message: 'Something went wrong', type: 'error' })
    }
  }

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
              data.users.slice(3).map((user: any) => <NewSignupCard user={user} key={user.uid} />)
            )}
          </main>
        </section>
        <section className="mt-4">
          <form className="relative" onSubmit={handleFeedbackSubmit}>
            <textarea
              style={{ resize: 'none' }}
              className="w-full text-sm rounded"
              rows={5}
              name="feedback"
              id="feedback"
              placeholder="Request for more features, file bug report, or just a friendly word?"
              ref={feedbackRef}
            ></textarea>
            <div className="absolute flex justify-end right-2 bottom-3">
              <button className="px-1 py-0.5 rounded text-xs text-white bg-violet-500">
                Submit
              </button>
            </div>
          </form>
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
