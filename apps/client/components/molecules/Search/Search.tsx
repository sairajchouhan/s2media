import { useEffect, useRef, useState } from 'react'
import { Popover } from '@headlessui/react'
import { Avatar } from '../../atoms/Avatar'
import { useRouter } from 'next/router'
import useSearch from '../../../hooks/useSearch'

export const Search = () => {
  const router = useRouter()
  const inputRef = useRef<null | HTMLInputElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [q, setQ] = useState('')
  const { results } = useSearch({ q })

  useEffect(() => {
    if (!isOpen) {
      inputRef.current?.blur()
    }
  }, [isOpen])

  const stateChanger = (arg: boolean) => {
    setIsOpen(arg)
  }

  return (
    <div className="w-full">
      <Popover className="relative">
        {({ close, open }) => (
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
                        <div
                          onClick={() => {
                            router.push(`/profile/${result.username}`)
                            close()
                          }}
                          key={result.uid}
                          className="flex items-center py-2"
                        >
                          <Avatar src={result.avatar ?? null} w="w-10" h="h-10" />
                          <div className="flex flex-col ml-4 cursor-pointer">
                            <div className="text-base font-bold ml-0.5 text-gray-800 ">
                              {result?.profile?.displayName}
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
