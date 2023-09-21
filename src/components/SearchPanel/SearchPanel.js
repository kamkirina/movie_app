import { Component } from 'react'
import { debounce } from 'lodash'
import './SearchPanel.css'

export default class SearchPanel extends Component {
  searchMovies = debounce((event) => {
    const text = event.target.value
    const page = 1

    if (text) {
      this.props.getMovieForCards(text, page)
    }
  }, 500)

  render() {
    return <input className="search" onChange={this.searchMovies} type="search" placeholder="Type to search..." />
  }
}
