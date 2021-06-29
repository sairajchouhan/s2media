import { ClientSafeProvider, getProviders, signIn } from 'next-auth/client'
import React from 'react'

const LogIn = ({ providers }: { providers: ClientSafeProvider[] }) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            className="px-2 py-1 mt-3 text-white bg-indigo-500 rounded-md"
            onClick={() => signIn(provider.id, { callbackUrl: `http://localhost:3000/home` })}
          >
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
export default LogIn
