import { useEffect, useRef, useState } from 'react'
import { Popover } from '@headlessui/react'
import axios from 'axios'
import { Avatar } from '../../atoms/Avatar'

export const Search = () => {
  const inputRef = useRef<null | HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [q, setQ] = useState('')
  const [results, setResults] = useState<any[]>([])
  console.log(results)

  useEffect(() => {
    if (!isOpen) {
      console.log('executing blur')
      inputRef.current?.blur()
    }
  }, [isOpen])

  useEffect(() => {
    if (q) {
      axios
        .post(`http://localhost:5001/back/search?q=${q}`)
        .then((res) => {
          setResults(res.data.result)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [q])

  const stateChanger = (arg: boolean) => {
    setIsOpen(arg)
  }

  return (
    <div className="w-full">
      <Popover className="relative">
        {({ open }) => (
          <>
            {open ? stateChanger(true) : stateChanger(false)}
            <Popover.Button as="div">
              <div className="flex items-center w-full">
                <input
                  ref={inputRef}
                  type="text"
                  className="w-full pl-4 border border-gray-400 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder={`Search or users`}
                  onChange={(e) => setQ(e.target.value)}
                  onClick={(e) => {
                    e.preventDefault()
                  }}
                />
              </div>
            </Popover.Button>

            <Popover.Panel className="absolute left-0 right-0 z-30 mt-1 bg-white rounded-md shadow-md">
              <div className="px-4 py-5">
                {q.trim() === '' ? (
                  <p className="text-sm text-center text-gray-600">Try searching for People</p>
                ) : null}

                {q.trim() !== '' ? (
                  <div>
                    {results.length > 0 ? (
                      results.map((result) => (
                        <div key={result.uid} className="flex items-center py-2">
                          <Avatar src={result.avatar ?? null} w="w-10" h="h-10" />
                          <div className="flex flex-col ml-4">
                            <div className="text-base font-bold ml-0.5 text-gray-800 cursor-pointer">
                              {result?.profile.displayName}
                            </div>
                            <p className="text-base font-normal text-gray-500 ">
                              @{result?.username}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center">
                        No results found for{' '}
                        <span className="font-semibold text-indigo-500 ">{q}</span>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
    </div>
  )
}
