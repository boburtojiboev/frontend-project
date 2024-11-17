import { useState, useEffect } from 'react'

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<any[]>([])

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
  }, [])

  const addFavorite = (quote: any) => {
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, quote]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const removeFavorite = (quoteId: number) => {
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((q) => q.id !== quoteId)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return newFavorites
    })
  }

  const isFavorite = (quoteId: number) => {
    return favorites.some((q) => q.id === quoteId)
  }

  return { favorites, addFavorite, removeFavorite, isFavorite }
}
