import React, { Component } from 'react'
import { Image, Rate, Space, Typography } from 'antd'
import { StarFilled } from '@ant-design/icons'

import GenreContext from '../context/ContextGenre'
import noPoster from '../img/no_image.png'
const { Title, Text } = Typography
export default class FilmItem extends Component {
  state = {
    rating: 0,
  }

  componentDidMount() {
    let rating = this.props.param.rating
    this.setState({
      rating: rating ? rating : 0,
    })
  }
  render() {
    const { id, vote_average, poster_path, title, genre_ids, overview } = this.props.param
    let path = ''
    if (poster_path) {
      path = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + poster_path
    } else {
      path = noPoster
    }
    let borderColor = ''
    if (vote_average >= 0 && vote_average < 3) {
      borderColor = '#E90000'
    } else if (vote_average >= 3 && vote_average < 5) {
      borderColor = '#E97E00'
    } else if (vote_average >= 5 && vote_average < 7) {
      borderColor = '#E9D100'
    } else {
      borderColor = '#66E900'
    }
    const styleRate = {
      border: `2px solid ${borderColor}`,
    }
    return (
      <GenreContext.Consumer>
        {({ genres, movieDB, guestSession }) => {
          return (
            <div className="film-item">
              <Image className="film-item--poster" loading="lazy" width={220} src={path} />
              <div direction="vertical" className="film-item--info info">
                <Title className="info__title" ellipsis={{ rows: 2 }} level={4}>
                  {title}
                </Title>
                <Space size={'small'} wrap="true" className="info--genres">
                  {genre_ids.map((e) => (
                    <Text className="info--genre" keyboard key={e}>
                      {genres.find((x) => x.id == e).name}
                    </Text>
                  ))}
                </Space>
                <Text className="info--description" wrap="true">
                  {overview}
                </Text>
                <Rate
                  onChange={(num) => {
                    this.setState({
                      rating: num,
                    })
                    movieDB.addRate({
                      id: id,
                      guestId: guestSession.guest_session_id,
                      value: '{"value":' + num + '}',
                    })
                  }}
                  className="info--rate-star"
                  count={10}
                  value={this.state.rating}
                  character={<StarFilled width={23} />}
                ></Rate>
                <div className="info--rate-icon" style={styleRate}>
                  <Text>{vote_average.toFixed(1)}</Text>
                </div>
              </div>
            </div>
          )
        }}
      </GenreContext.Consumer>
    )
  }
}
