import { API_ENDPOINT } from '../constants'

export async function searchMovies ({title}) {
  if(title === '') return null

  try{
    const res = await fetch(`${API_ENDPOINT}s=${title}`)
    const json = await res.json()

    const movies = json.Search

    return movies?.map(movie => ({
      id: movie.imdbID,
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster
    }))
  }catch(e){
    throw new Error('Error searching movies')
  }
}