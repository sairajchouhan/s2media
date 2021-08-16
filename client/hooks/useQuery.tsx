import { useEffect, useState } from 'react'
import { axios } from '../config/axios'
export const useQuery = (url: string, opts?: any) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const func = async () => {
      setError(false)
      try {
        const { data } = await axios.get(url, opts)
        await new Promise((res) => setTimeout(res, 2000))
        setData(data)
      } catch (err) {
        console.error(err)
        setError(true)
      }
      setLoading(false)
    }
    func()
  }, [url, opts])

  return {
    data,
    loading,
    error,
  }
}
