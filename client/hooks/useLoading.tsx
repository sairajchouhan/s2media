import { useState } from 'react'

const useLoading = (initial?: boolean) => {
  const [loading, setLoading] = useState(initial)
  const toggleLoading = () => setLoading((loading) => !loading)
  return [loading, toggleLoading]
}

export default useLoading
