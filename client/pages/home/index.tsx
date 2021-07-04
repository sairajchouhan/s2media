import { useSession } from 'next-auth/client'
import PrivateRoute from '../../components/PrivateRoute'
import Stories from '../../components/Stories'
const Home = () => {
  const [session] = useSession()
  console.log(session)

  return (
    <PrivateRoute>
      <div className="border border-gray-200">
        <Stories />
        <main className="px-6 ">
          {new Array(9).fill('-').map((_) => (
            <div key={_}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptas consequatur
              accusamus exercitationem et veritatis, error tenetur optio quia quaerat quibusdam
              saepe sed aliquid repudiandae fugit! Quia eos assumenda, in quae a ipsam recusandae
              <div>---------------------------------</div>
            </div>
          ))}
        </main>
      </div>
    </PrivateRoute>
  )
}

export default Home
