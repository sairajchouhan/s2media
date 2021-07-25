import { useEffect, useState } from 'react'
import { axios } from '../config/axios'
export const useQuery = (url: string, opts?: any) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    const func = async () => {
      setError(false)
      setLoading((l) => !l)
      try {
        const { data } = await axios.get(url, opts)
        setData(data)
      } catch (err) {
        console.error(err)
        setError(true)
      }
      setLoading((l) => !l)
    }
    func()
  }, [url])

  return {
    data,
    loading,
    error,
  }
}
