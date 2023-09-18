import { Component } from 'react'

import MovieDetails from '../MovieDetails'
import './MovieList.css'
import MovieDbService from '../../services/MovieDbService'

export default class MovieList extends Component {
  movieDB = new MovieDbService()
  state = {
    error: null,
    isLoaded: false,
    movies: [],
  }
  constructor() {
    super()
    this.createCard()
  }

  createCard() {
    this.movieDB.getMovies('return').then(
      (body) => {
        this.setState({
          isLoaded: true,
          movies: body,
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
  render() {
    const { error, isLoaded, movies } = this.state
    if (error) {
      return <div>Ошибка: {error.message}</div>
    } else if (!isLoaded) {
      return <div>Загрузка...</div>
    } else {
      return (
        <ul className="movie__list">
          {movies.map((mv) => (
            <MovieDetails {...mv} key={mv.id} />
          ))}
        </ul>
      )
    }
  }
}
