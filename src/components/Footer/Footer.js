import { Component } from 'react'
import './Footer.css'
import { Pagination } from 'antd'

export default class Footer extends Component {
  render() {
    const { error, isLoaded, totalPages, getMoviePage, page } = this.props

    if (isLoaded && !error) {
      return <Pagination defaultCurrent={1} total={totalPages} onChange={getMoviePage} current={page} />
    }
  }
}
