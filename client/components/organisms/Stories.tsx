/* eslint-disable @next/next/no-img-element */

const Stories = () => {
  return (
    <div className="px-3 py-3 border-b rounded-sm border-opacity-80">
      <ul className="flex space-x-6">
        <li className="flex flex-col items-center space-y-1 ">
          <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400">
            <a href="#" className="block p-0.5 bg-white rounded-full">
              <img
                className="w-16 h-16 rounded-full "
                src="https://placekitten.com/200/200"
                alt=""
              />
              <button className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 font-mono text-xl font-semibold text-white bg-blue-500 border-2 border-white rounded-full">
                +
              </button>
            </a>
          </div>
          <a href="#" className="text-sm font-normal text-gray-600">
            mewoo
          </a>
        </li>
        <li className="flex flex-col items-center space-y-1 ">
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400">
            <a href="#" className="block p-0.5 bg-white rounded-full">
              <img
                className="w-16 h-16 rounded-full "
                src="https://placekitten.com/201/200"
                alt=""
              />
            </a>
          </div>
          <a href="#" className="text-sm font-normal text-gray-600">
            cattie
          </a>
        </li>
        <li className="flex flex-col items-center space-y-1 ">
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400">
            <a href="#" className="block p-0.5 bg-white rounded-full">
              <img
                className="w-16 h-16 rounded-full "
                src="https://placekitten.com/205/200"
                alt=""
              />
            </a>
          </div>
          <a href="#" className="text-sm font-normal text-gray-600">
            kitty
          </a>
        </li>
        <li className="flex flex-col items-center space-y-1 ">
          <div className="p-0.5 rounded-full bg-gradient-to-tr from-indigo-400 to-pink-400">
            <a href="#" className="block p-0.5 bg-white rounded-full">
              <img
                className="w-16 h-16 rounded-full "
                src="https://placekitten.com/203/200"
                alt=""
              />
            </a>
          </div>
          <a href="#" className="text-sm font-normal text-gray-600">
            akhil
          </a>
        </li>
      </ul>
    </div>
  )
}

export default Stories
