import './App.css'
import { useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'

function App() {
  const [sortByYear, setSortByYear] = useState(false)
  const {search, setSearch, error} = useSearch()
  const {movies, getMovies, loading} = useMovies({sortByYear})
  const debounceSearch = useCallback(
    debounce(({search}) => {
      getMovies({search})
    }, 500)
    , [getMovies])

  const handleChange = (event) => {
    const newQuery = event.target.value
    if(newQuery.startsWith(' ')) return
    setSearch(event.target.value)
    debounceSearch({search: newQuery})
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
  }

  return (
    <>
      <header>
        <h2>Buscador de películas</h2>
        <h4>Hecho por Sergio Dacal Rodríguez</h4>
        <form className='form' onSubmit={handleSubmit}>
          <input 
            autoComplete="off" 
            onChange={handleChange} 
            name='query' 
            type="text" 
            placeholder='Avengers, Star Wars ...' 
            value={search}
            style={{
              border: '2px solid transparent',
              borderColor: error ? 'red' : 'transparent'
            }}/>
            <label>
              Ordenar
              <input type="checkbox" checked={sortByYear} onChange={() => {setSortByYear(!sortByYear)}} />
            </label>
          <button type='submit'>Buscar</button>
        </form>
        <p style={{color: 'red'}}>{error}</p>
      </header>
      <main>
        {
          loading ? (
            <p>Cargando ...</p>
          ):(
            <Movies moviesList={movies}/>
          )
        }
      </main>
    </>
  )
}

export default App
