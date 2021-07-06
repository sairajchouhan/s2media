/* eslint-disable @next/next/no-img-element */

const Stories = () => {
  return (
    <div className="px-3 py-4 mt-6 border rounded-lg">
      <ul className="flex space-x-6">
        <li className="flex flex-col items-center space-y-1 ">
          <div className="relative p-1 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400">
            <a href="#" className="block p-1 bg-white rounded-full">
              <img
                className="w-16 h-16 rounded-full "
                src="https://placekitten.com/200/200"
                alt=""
              />
              <button className="absolute bottom-0 right-0 flex items-center justify-center w-8 h-8 font-mono text-2xl font-semibold text-white bg-blue-500 border-4 border-white rounded-full">
                +
              </button>
            </a>
          </div>
          <a href="#">Kitty 1</a>
        </li>
        <li className="flex flex-col items-center space-y-1 ">
          <div className="p-1 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400">
            <a href="#" className="block p-1 bg-white rounded-full">
              <img
                className="w-16 h-16 rounded-full "
                src="https://placekitten.com/200/200"
                alt=""
              />
            </a>
          </div>
          <a href="#">Kitty 1</a>
        </li>
        <li className="flex flex-col items-center space-y-1 ">
          <div className="p-1 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400">
            <a href="#" className="block p-1 bg-white rounded-full">
              <img
                className="w-16 h-16 rounded-full "
                src="https://placekitten.com/200/200"
                alt=""
              />
            </a>
          </div>
          <a href="#">Kitty 1</a>
        </li>
      </ul>
    </div>
  )
}

export default Stories
