import { useState } from 'react'
import { searchMovies } from '../services/movies'
import { useRef } from 'react'
import { useMemo } from 'react'
import { useCallback } from 'react'

export function useMovies ({sortByYear}) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadError, setLoadError] = useState(null)
  const previousSearch = useRef('')

  const getMovies = useCallback(
    async ({search}) => {
      try{
        setLoading(true)
        setLoadError(null)
        if(previousSearch.current === search) return
        searchMovies({title: search}).then((newMovies) => setMovies(newMovies))
        previousSearch.current = search
      }catch(e){
        setLoadError(e.message)
      }finally{
        setLoading(false)
      }
    }, [])

  const sortedMovies = useMemo(() => {
    return sortByYear ? [...movies].sort((a, b) => b.year.localeCompare(a.year)) : movies
  }, [movies, sortByYear])

  return {movies: sortedMovies, getMovies, loading, loadError}
}