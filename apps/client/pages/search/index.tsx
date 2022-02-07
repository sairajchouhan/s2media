import React, { useState } from 'react'
import Head from 'next/head'
import { PageLayout } from '../../components/molecules/Page'
import useSearch from '../../hooks/useSearch'
import { Avatar } from '../../components/atoms/Avatar'
import { useRouter } from 'next/router'

const SearchPage = () => {
  const [q, setQ] = useState('')
  const { results } = useSearch({ q })
  const router = useRouter()

  return (
    <>
      <Head>
        <title>Home / S2Media</title>
      </Head>
      <PageLayout>
        <main>
          <div className="w-[98%] mx-auto mt-2">
            <input
              type="text"
              className="block w-full pl-4 border border-gray-400 rounded-full outline-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder={`Search or users`}
              onChange={(e) => setQ(e.target.value)}
              onClick={(e) => {
                e.preventDefault()
              }}
            />
          </div>
          <div className="w-[95%] mx-auto">
            {results && results.length > 0 ? (
              results.map((result) => (
                <div
                  onClick={() => {
                    router.push(`/profile/${result.username}`)
                    close()
                  }}
                  key={result.uid}
                  className="flex items-center w-full py-2"
                >
                  <Avatar src={result.avatar ?? null} w="w-10" h="h-10" />
                  <div className="flex flex-col ml-4 cursor-pointer">
                    <div className="text-base font-bold ml-0.5 text-gray-800 ">
                      {result?.profile?.displayName}
                    </div>
                    <p className="text-base font-normal text-gray-500 ">@{result?.username}</p>
                  </div>
                </div>
              ))
            ) : (
              <div>
                {q.trim() === '' ? (
                  <h1 className="mt-5 text-4xl text-center text-indigo-500">Search for Users</h1>
                ) : (
                  <h1 className="mt-5 text-4xl text-center text-indigo-500">
                    No users found with {q}
                  </h1>
                )}
              </div>
            )}
          </div>
        </main>
      </PageLayout>
    </>
  )
}

export default SearchPage
