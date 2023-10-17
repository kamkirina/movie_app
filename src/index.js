import { Component } from 'react'
import { createRoot } from 'react-dom/client'
import { Online, Offline } from 'react-detect-offline'
import { Tabs } from 'antd'

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
    moviesRt: [],
    searchText: 'return',
    totalPages: null,
    page: 1,
    guestSessionId: null,
  }
  _transformResult(movie) {
    return {
      id: movie.id,
      title: movie.title,
      date: movie.release_date,
      description: movie.overview,
      poster: movie.poster_path,
      voteAvr: movie.vote_average,
      rating: movie.rating ? movie.rating : 0,
    }
  }

  componentDidMount() {
    this.runGuestSession()
    this.getMovieForCards(this.state.searchText, this.state.page)
  }

  runGuestSession() {
    this.movieDB.defaultSession().then(
      (body) => {
        this.setState({
          guestSessionId: body,
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

  getMovieForCards(searchText, page) {
    this.movieDB.getMovies(searchText, page).then(
      (body) => {
        const movies = body.results.map((movie) => {
          return {
            id: movie.id,
            title: movie.title,
            date: movie.release_date,
            description: movie.overview,
            poster: movie.poster_path,
            voteAvr: movie.vote_average,
          }
        })
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

  getRatedMovies(page) {
    this.movieDB.getRatedWithAccount(page).then(
      (body) => {
        const moviesRt = body.results.map(this._transformResult)
        this.setState({
          isLoaded: true,
          moviesRt,
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

  switchTabs(num) {
    if (num == 2) {
      this.setState({
        isLoaded: false,
      })
      this.getRatedMovies(1)
    }
    this.setState({
      isLoaded: false,
    })
    this.getMovieForCards(this.state.searchText, 1)
  }

  editMovies = (id, value) => {
    console.log(id, value)
    this.setState(({ movies }) => {
      const idx = movies.findIndex((el) => el.id === id)

      const oldItem = movies[idx]

      const newItem = { ...oldItem, rating: value }

      const newArr = [...movies.slice(0, idx), newItem, ...movies.slice(idx + 1)]
      return {
        movies: newArr,
      }
    })
  }

  render() {
    const { error, isLoaded, moviesRt, totalPages, page, rated } = this.state

    const render1 = (
      <div className="wrapper">
        <SearchPanel getMovieForCards={(searchText, page) => this.getMovieSearch(searchText, page)} />
        {render2}
      </div>
    )
    const render2 = (
      <div className="wrapper">
        <MovieList movies={moviesRt} isLoaded={isLoaded} error={error} rated={rated} />
        <Footer
          error={error}
          isLoaded={isLoaded}
          totalPages={totalPages}
          getMoviePage={(page) => this.getMoviePage(page)}
          page={page}
        />
      </div>
    )
    let arr = [
      ['Search', 'Rated'],
      [render1, render2],
    ]
    return (
      <div className="wrapper">
        <Online>
          <Tabs
            defaultActiveKey="1"
            centered
            items={arr.map((_, i) => {
              const id = String(i + 1)
              return {
                label: arr[0][i],
                key: id,
                children: arr[1][i],
              }
            })}
            onChange={(num) => this.switchTabs(num)}
            destroyInactiveTabPane={true}
          />
        </Online>
        <Offline>Only shown offline (surprise!)</Offline>
      </div>
    )
  }
}

root.render(<App />)
