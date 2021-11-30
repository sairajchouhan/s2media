import { Avatar } from '../atoms/Avatar'

const RightNav = () => {
  return (
    <div className="">
      <div className="mt-4">
        <div className="flex items-center w-full">
          <input
            type="text"
            className="w-full pl-4 border border-gray-400 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Search"
          />
        </div>
      </div>
      <div className="w-full ">
        <section className="p-4 mt-4 rounded-lg" style={{ backgroundColor: 'rgb(246 246 246 / 75%)' }}>
          <h2 className="mb-2 -mt-2 text-xl font-bold text-gray-700">Follow</h2>
          <main>
            <FollowCard />
            <FollowCard />
            <FollowCard />
            <FollowCard />
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

const FollowCard = () => {
  return (
    <div>
      <div className="flex items-center py-3 space-x-3">
        <div>
          <Avatar w="w-10" h="h-10" />
        </div>
        <div className="flex items-center justify-between w-full">
          <div>
            <div className="text-sm font-bold text-gray-800 cursor-pointer hover:underline">Sairaj Chouhan</div>
            <p className="text-sm font-normal text-gray-500 ">@sairaj2119_54n9</p>
          </div>
          <div>
            <button className="px-4 py-1 text-sm font-medium text-white bg-indigo-500 rounded-full ">Follow</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightNav
