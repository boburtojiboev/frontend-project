'use client'
// import { useFavorites } from '@/app/quotes/hooks/use-favorites'
import { QuoteCard } from '@/app/quotes/components/quote-card'
import { useFavorites } from '../hooks/usefovorite'

export default function FavoriteQuotesPage() {
  const { favorites, removeFavorite } = useFavorites()
  return (
    <div>
      <h1
        className={'mb-4 text-3xl font-bold italic text-secondary-foreground'}
      >
        My Favorite
      </h1>
      <ul>
        {favorites.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote.quote}
            author={quote.author}
            isFavorite={true}
            onFavorite={() => {
              removeFavorite(quote.id)
            }}
          />
        ))}
      </ul>
    </div>
  )
}
