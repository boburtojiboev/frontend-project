'use client'

import { useInfiniteQuotes } from '@/app/quotes/hooks/use-infinite-quotes'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { useRef, useCallback } from 'react'
import { useFavorites } from '../hooks/usefovorite'
// import { useFavorites } from '@/app/quotes/hooks/use-favorites'

export default function QuotesPage() {
  const { quotes, hasMore, setPage } = useInfiniteQuotes()
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const observer = useRef<IntersectionObserver | null>(null)

  const lastQuoteElementRef = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [hasMore, setPage]
  )

  return (
    <>
      {quotes.map((quote, index) => {
        const favorite = isFavorite(quote.id)
        const onFavoriteClick = () => {
          if (favorite) {
            removeFavorite(quote.id)
          } else {
            addFavorite(quote)
          }
        }
        if (quotes.length === index + 1) {
          return (
            <QuoteCard
              ref={lastQuoteElementRef}
              key={quote.id}
              quote={quote.quote}
              author={quote.author}
              isFavorite={favorite}
              onFavorite={onFavoriteClick}
            />
          )
        } else {
          return (
            <QuoteCard
              key={quote.id}
              quote={quote.quote}
              author={quote.author}
              isFavorite={favorite}
              onFavorite={onFavoriteClick}
            />
          )
        }
      })}
    </>
  )
}