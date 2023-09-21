import { useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({search}) {
  const [movies, setMovies] = useState([])

  const getMovies = () => {
    searchMovies({title: search}).then((newMovies) => setMovies(newMovies))
  }

  return {movies, getMovies}
}