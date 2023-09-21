const MoviesList = ({moviesList}) => {
  return (
    <ul className="movies">
    {
      moviesList.map(movie => {
        return (
          <li className="movie" key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </li>
        )
      })
    }
  </ul>
  )
}

const NoList = () => {
  return (
    <p>No se encontraron resultados</p>
  )
}

export function Movies({moviesList}) {

  const hasMovies = moviesList?.length > 0 ? true : false

  return (
    hasMovies 
    ? <MoviesList moviesList={moviesList}/> 
    : <NoList />
  )
}