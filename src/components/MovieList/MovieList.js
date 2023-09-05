import { Component } from 'react'

import MovieDetails from '../MovieDetails/MovieDetails'
import './MovieList.css'

export default class MovieList extends Component {
  render() {
    return (
      <ul className="movie__list">
        <MovieDetails />
        <MovieDetails />
        <MovieDetails />
        <MovieDetails />
        <MovieDetails />
        <MovieDetails />
      </ul>
    )
  }
}
