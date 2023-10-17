import { Component } from 'react'
import { Pagination, Space, Empty, Alert } from 'antd'

import FilmItem from './FilmItem'

export default class FilmsList extends Component {
  createItems = (listMovie) => {
    if (listMovie) {
      if (listMovie.length != 0) {
        return listMovie.slice(0).map((e) => {
          return <FilmItem key={e.id} param={e} rateListMovie={this.props.rateListMovie} />
        })
      }
    } else {
      return <Empty className="empty" description="No movies found or search input empty" />
    }
  }

  render() {
    try {
      const filmsItems = this.createItems(this.props.listMovie)
      return (
        <div className="filmsapp__films films">
          <Space className="films__items-wrapper" direction="vertical" align="center" wrap="true" size={'middle'}>
            <Space className="films__items" direction="horizontal" wrap="true" size={'middle'}>
              {filmsItems}
            </Space>
          </Space>
          <Pagination
            onChange={(e) => this.props.onChangePagination(e)}
            className="films__pagination pagination"
            defaultPageSize={20}
            total={this.props.totalResults}
          />
        </div>
      )
    } catch (err) {
      console.error(err)
      return <Alert message={`Error fetching movie data: ${err}`} type="error" showIcon />
    }
  }
}
