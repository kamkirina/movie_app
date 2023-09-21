import { Component } from 'react'
import { Spin, Alert } from 'antd'

import MovieDetails from '../MovieDetails'
import './MovieList.css'

export default class MovieList extends Component {
  render() {
    const { error, isLoaded, movies } = this.props

    if (error) {
      return <Alert message="Error" description={error.message} type="error" showIcon />
    } else if (!isLoaded) {
      return <Spin size="large" />
    } else {
      if (movies.length !== 0) {
        return (
          <ul className="movie__list">
            {movies.map((mv) => (
              <MovieDetails {...mv} key={mv.id} />
            ))}
          </ul>
        )
      } else {
        return <Alert description="Nothing has been found for this search." type="info" showIcon />
      }
    }
  }
}
