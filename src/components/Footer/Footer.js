import { Component } from 'react'
import './Footer.css'
import { Pagination } from 'antd'

export default class Footer extends Component {
  render() {
    const { /*isLoaded, error,*/ totalPages, getMoviePage, page } = this.props

    //  if (!isLoaded || error) {
    // return
    //   }
    return <Pagination defaultCurrent={1} total={totalPages} onChange={getMoviePage} current={page} />
  }
}
