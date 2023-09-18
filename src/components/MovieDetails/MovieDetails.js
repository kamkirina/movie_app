import { Component } from 'react'
import { parseISO, format } from 'date-fns'

import './MovieDetails.css'
import noPoster from '../../img/no_image.png'
const POSTER_URL = 'https://image.tmdb.org/t/p/original'

export default class MovieDetails extends Component {
  shortDescription(description) {
    let indx = description.indexOf(' ', 290)
    let shortDescr = description.slice(0, indx)
    return shortDescr
  }

  render() {
    const { title, date, description, poster } = this.props
    let posterUrl = ''
    if (poster) {
      posterUrl = POSTER_URL + poster
    } else posterUrl = noPoster
    let formateDate = ''
    if (date) {
      formateDate = format(parseISO(date), 'MMMM dd, yyyy')
    }
    const shortDescr = this.shortDescription(description)
    return (
      <li className="movie__card">
        <img className="movie__img" src={posterUrl} />
        <div className="movie__description">
          <h5 className="movie__title">{title}</h5>
          <div className="movie__date">{formateDate}</div>
          <ul className="movie__genre">
            <li>Action</li>
            <li>Drama</li>
          </ul>
          <p className="movie__text">{shortDescr}</p>
        </div>
      </li>
    )
  }
}
