import { Component } from 'react'
import { createRoot } from 'react-dom/client'

import './style.css'
import MovieList from './components/MovieList'

const container = document.getElementById('root')
const root = createRoot(container)

export default class App extends Component {
  render() {
    return <MovieList />
  }
}

root.render(<App />)
