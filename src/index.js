import { Component } from 'react'
import { createRoot } from 'react-dom/client'
import { Online, Offline } from 'react-detect-offline'

import SearchPanel from './components/SearchPanel'
import './style.css'
import MovieList from './components/MovieList'
import Footer from './components/Footer'
import MovieDbService from './services/MovieDbService'

const container = document.getElementById('root')
const root = createRoot(container)

export default class App extends Component {
  movieDB = new MovieDbService()
  state = {
    error: null,
    isLoaded: false,
    movies: [],
    searchText: 'return',
    totalPages: null,
    page: 1,
  }
  _transformResult(movie) {
    return {
      id: movie.id,
      title: movie.title,
      date: movie.release_date,
      description: movie.overview,
      poster: movie.poster_path,
    }
  }

  componentDidMount() {
    this.getMovieForCards(this.state.searchText, this.state.page)
  }

  getMovieForCards(searchText, page) {
    this.movieDB.getMovies(searchText, page).then(
      (body) => {
        const movies = body.results.map(this._transformResult)
        this.setState({
          isLoaded: true,
          movies,
          searchText,
          page,
          totalPages: body.total_pages,
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error,
        })
      }
    )
  }

  getMoviePage(page) {
    this.setState({
      page,
      isLoaded: false,
    })
    this.getMovieForCards(this.state.searchText, page)
  }

  getMovieSearch(searchText, page) {
    this.setState({
      isLoaded: false,
    })
    this.getMovieForCards(searchText, page)
  }

  render() {
    const { error, isLoaded, movies, totalPages, page } = this.state

    return (
      <div>
        <Online>
          <div className="wrapper">
            <SearchPanel getMovieForCards={(searchText, page) => this.getMovieSearch(searchText, page)} />
            <MovieList movies={movies} isLoaded={isLoaded} error={error} />
            <Footer
              error={error}
              totalPages={totalPages}
              page={page}
              getMoviePage={(page) => this.getMoviePage(page)}
            />
          </div>
        </Online>
        <Offline>Only shown offline (surprise!)</Offline>
      </div>
    )
  }
}

root.render(<App />)
