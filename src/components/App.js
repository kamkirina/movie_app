import React from 'react'
import { Spin, Input, Menu, Alert } from 'antd'
import { debounce } from 'lodash'
import { Online, Offline } from 'react-detect-offline'

import GenreContext from '../context/ContextGenre'
import MovieDBService from '../services/MovieDBService'

import FilmsList from './FilmsList'
import Footer from './Footer'

export default class App extends React.Component {
  movieDB = new MovieDBService()

  state = {
    itemsMeny: [
      {
        label: 'Search',
        key: 'search',
      },
      {
        label: 'Rated',
        key: 'rated',
      },
    ],
    currentNav: 'search',
    keyword: '',
    genres: null,
    guestSession: null,
    searchListMovie: [],
    rateListMovie: [],
    loading: true,
    error: false,
  }

  componentDidMount = async () => {
    this.searchMovie()
    this.runGuestSession()
    this.getGenres()
  }

  searchMovie() {
    this.movieDB
      .searchFilms({ keywords: this.state.keyword })
      .then((res) => {
        this.setState({ searchListMovie: res, loading: false })
      })
      .catch((err) => {
        this.onError(err)
      })
  }

  runGuestSession() {
    this.movieDB
      .guestSession()
      .then((res) => {
        this.setState({ guestSession: res })
      })
      .catch((err) => {
        this.onError(err)
      })
  }

  getGenres() {
    this.movieDB
      .getGenres()
      .then((res) => {
        this.setState({ genres: res })
      })
      .catch((err) => {
        this.onError(err)
      })
  }
  onSelectNav = (e) => {
    if (e.key == 'rated') {
      this.movieDB
        .getRates({
          guestId: this.state.guestSession.guest_session_id,
          page: 1,
        })
        .then((res) => {
          this.setState({
            rateListMovie: res,
          })
        })
        .catch((err) => {
          this.onError(err)
        })
    }
    this.setState({
      currentNav: e.key,
    })
  }

  onError = (err) => {
    console.error(err)
    this.setState({ error: true })
  }

  onChangeSearch = (e) => {
    this.movieDB
      .searchFilms({ keywords: e })
      .then((res) => {
        this.setState({ keyword: e, searchListMovie: res, loading: false })
      })
      .catch((err) => {
        this.onError(err)
      })
  }

  onChangePagination = (e) => {
    if (this.state.currentNav == 'search') {
      this.movieDB
        .searchFilms({ page: e, keywords: this.state.keyword })
        .then((res) => {
          this.setState({ searchListMovie: res, loading: false })
        })
        .catch((err) => {
          this.onError(err)
        })
    } else {
      this.movieDB
        .getRates({
          guestId: this.state.guestSession.guest_session_id,
          page: e,
        })
        .then((res) => {
          this.setState({
            rateListMovie: res,
          })
        })
        .catch((err) => {
          this.onError(err)
        })
    }
  }

  render() {
    const { rateListMovie, searchListMovie, genres, loading, error } = this.state
    try {
      return (
        <div className="wrapper">
          <Online>
            <section className="filmsapp">
              <div direction="vertical" className="header">
                <Menu
                  className="header--meny"
                  onSelect={this.onSelectNav}
                  selectedKeys={this.state.currentNav}
                  mode="horizontal"
                  items={this.state.itemsMeny}
                />
                {this.state.currentNav == 'search' ? (
                  <Input
                    onChange={debounce((e) => {
                      e.preventDefault()
                      if (!e.target.value.replaceAll(' ', '') == '') {
                        this.onChangeSearch(String(e.target.value))
                      }
                    }, 500)}
                    size="large"
                    className="header--search"
                    placeholder="Type to search..."
                  ></Input>
                ) : null}
              </div>
              <GenreContext.Provider
                value={{
                  genres: genres ? genres.genres.slice(0) : [],
                  movieDB: this.movieDB,
                  guestSession: this.state.guestSession,
                }}
              >
                {error ? (
                  <Alert message={`Error fetching movie data: ${error}`} type="error" showIcon />
                ) : loading ? (
                  <Spin className="loading" />
                ) : (
                  <FilmsList
                    onChangePagination={this.onChangePagination}
                    totalResults={
                      this.state.currentNav == 'search' ? searchListMovie.total_results : rateListMovie.total_results
                    }
                    listMovie={this.state.currentNav == 'search' ? searchListMovie.results : rateListMovie.results}
                    rateListMovie={rateListMovie.results}
                  />
                )}
              </GenreContext.Provider>
              <Footer />
            </section>
          </Online>
          <Offline>Only shown offline (surprise!)</Offline>
        </div>
      )
    } catch (err) {
      console.error(err)
    }
  }
}
