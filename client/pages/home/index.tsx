import { useSession } from 'next-auth/client'
import PrivateRoute from '../../components/PrivateRoute'
import Stories from '../../components/Stories'
const Home = () => {
  const [session, loading] = useSession()
  console.log(session)

  return (
    <PrivateRoute>
      {JSON.stringify(session)}
      <section>
        <Stories />
        <main className="grid grid-cols-2 px-2">
          {new Array(9).fill('-').map((_) => (
            <>
              <div key={_}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptas consequatur
                accusamus exercitationem et veritatis, error tenetur optio quia quaerat quibusdam
                saepe sed aliquid repudiandae fugit! Quia eos assumenda, in quae a ipsam recusandae
                <div>---------------------------------</div>
              </div>
            </>
          ))}
        </main>
      </section>
    </PrivateRoute>
  )
}

export default Home
