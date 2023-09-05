import { Component } from 'react'
import './MovieDetails.css'

export default class MovieDetails extends Component {
  render() {
    //  const { title } = this.props
    return (
      <li className="wrapper">
        <div className="movie__img"></div>
        <div className="movie__description">
          <h5 className="movie__title">The way back</h5>
          <div className="movie__date">March 5, 2020</div>
          <ul className="movie__genre">
            <li>Action</li>
            <li>Drama</li>
          </ul>
          <p className="movie__text">
            A former basketball all-star, who has lost his wife and family foundation in a struggle with addiction
            attempts to regain his soul and salvation by becoming the coach of a disparate ethnically mixed high ...
          </p>
        </div>
      </li>
    )
  }
}
