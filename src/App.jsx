import './App.css'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'

function App() {
  const {search, setSearch, error} = useSearch()
  const {movies, getMovies} = useMovies({search})

  const handleChange = (event) => {
    const newQuery = event.target.value
    if(newQuery.startsWith(' ')) return
    setSearch(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
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
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
          <p style={{color: 'red'}}>{error}</p>
          <Movies moviesList={movies}/>
      </main>
    </>
  )
}

export default App
