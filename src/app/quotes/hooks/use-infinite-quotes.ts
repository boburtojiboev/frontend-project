import { useState, useEffect } from 'react'

export const useInfiniteQuotes = () => {
  const [quotes, setQuotes] = useState<any[]>([])
  const [page, setPage] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const fetchQuotes = async () => {
    try {
      const limit = 10
      const skip = page * limit
      const response = await fetch(`https://dummyjson.com/quotes?limit=${limit}&skip=${skip}`)
      const data = await response.json()
      setQuotes(prevQuotes => [...prevQuotes, ...data.quotes])
      if (data.total <= skip + limit) {
        setHasMore(false)
      }
    } catch (error) {
      console.error('Failed to fetch quotes', error)
    }
  }

  useEffect(() => {
    fetchQuotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  return { quotes, hasMore, setPage }
}