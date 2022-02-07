import { useEffect, useState } from 'react'
import { axios, SEARCH_URL } from '../config/axios'

interface IUseSearch {
  q: string
}

const useSearch = ({ q }: IUseSearch) => {
  const [results, setResults] = useState<any[]>([])

  useEffect(() => {
    if (q) {
      axios
        .post(`${SEARCH_URL}?q=${q}`)
        .then((res) => {
          setResults(res.data.result)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [q])

  useEffect(() => {
    if (typeof q === 'string' && q.trim() === '') {
      setResults([])
    }
  }, [q])

  return {
    results,
  }
}

export default useSearch
