import { useRouter } from 'next/router'
import React from 'react'

const EachPost = () => {
  const router = useRouter()

  return <div>{JSON.stringify(router.query)}</div>
}

export default EachPost
