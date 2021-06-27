import Stories from '../../components/Stories'
import Post from '../../components/Post'

const Home = () => {
  return (
    <div>
      <Stories />
      <main className="h-screen px-4 py-2 bg-blue-50">
        <Post />
      </main>
    </div>
  )
}

export default Home
