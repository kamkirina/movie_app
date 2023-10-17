import { Component } from 'react'
import { parseISO, format } from 'date-fns'
import { Rate, Statistic } from 'antd'

import './MovieDetails.css'
import noPoster from '../../img/no_image.png'
import MovieDbService from '../../services/MovieDbService'

const POSTER_URL = 'https://image.tmdb.org/t/p/original'

export default class MovieDetails extends Component {
  state = {
    rating: 0,
  }
  movieDB = new MovieDbService()

  shortDescription(description) {
    let indx = description.indexOf(' ', 200)
    let shortDescr = description.slice(0, indx)
    return shortDescr
  }

  addRate = (num) => {
    this.movieDB
      .addRating(this.props.id, JSON.stringify({ value: num }), this.props.guestSessionId)
      .then((body) => console.log(body.status))
      .catch((error) => console.error(error))
    this.setState({
      rating: num,
    })
  }

  render() {
    const { title, date, description, poster, voteAvr, rating } = this.props
    let stat = voteAvr.toFixed(1)
    if (stat == 10 || stat == 0) {
      stat = Math.floor(stat)
    }
    let bgcolor = ''
    if (stat <= 7) {
      if (stat <= 5) {
        if (stat <= 3) {
          bgcolor = '#E90000'
        } else {
          bgcolor = '#E97E00'
        }
      } else {
        bgcolor = '#E9D100'
      }
    } else {
      bgcolor = '#66E900'
    }
    const borderColor = {
      border: `2px solid ${bgcolor}`,
    }
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
          <div className="movie__info">
            <h5 className="movie__title">{title}</h5>
            <Statistic className="movie__stat" value={stat} style={borderColor} />
            <div className="movie__date">{formateDate}</div>
            <ul className="movie__genre">
              <li>Action</li>
              <li>Drama</li>
            </ul>
          </div>
          <p className="movie__text">{shortDescr}</p>

          <Rate className="movie__rate" count={10} onChange={this.addRate} value={rating} />
        </div>
      </li>
    )
  }
}
