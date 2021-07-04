import { useSession } from 'next-auth/client'
import { Post } from '../../components/Post'
import PrivateRoute from '../../components/PrivateRoute'
import Stories from '../../components/Stories'
const Home = () => {
  const [session] = useSession()
  console.log(session)

  return (
    <PrivateRoute>
      <div className="border border-gray-200">
        <Stories />

        <main className="px-6">
          <Post />
        </main>
      </div>
    </PrivateRoute>
  )
}

export default Home
