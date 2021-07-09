import { useState } from 'react'

const useLoading = () => {
  const [loading, setLoading] = useState(false)
  const toggleLoading = () => setLoading((loading) => !loading)
  return [loading, toggleLoading]
}

export default useLoading
