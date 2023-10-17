export default class MovieDbService {
  AUTH_TOKEN =
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzdhNTYyOGFhYTU0NDBkNDZjOGU3NGUzZWYxYjgzYyIsInN1YiI6IjY0ZjZmNDQyYjIzNGI5MDExZDUxMTYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._wsryJxbFamh2LgJUkDPdmIqrBDG14U8a48y0nr2AmU'
  options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: this.AUTH_TOKEN,
    },
  }

  async getResourse(search, page) {
    const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=${page}`
    const res = await fetch(SEARCH_URL, this.options)
    if (!res.ok) {
      throw new Error('received ${res.status}')
    }
    return await res.json()
  }

  async getMovies(search, page) {
    const res = await this.getResourse(search, page)

    return res
    // return res.results.map(this._transformResult)
  }

  _transformResult(movie) {
    return {
      id: movie.id,
      title: movie.title,
      date: movie.release_date,
      description: movie.overview,
      poster: movie.poster_path,
    }
  }

  async defaultSession() {
    const GUEST_URL = 'https://api.themoviedb.org/3/authentication/guest_session/new'
    const res = await fetch(GUEST_URL, this.options)
    if (!res.ok) {
      throw new Error('received ${res.status}')
    }
    const result = await res.json()
    return result.guest_session_id
  }

  async getRated(page) {
    const guestSessionId = await this.defaultSession()
    const RATED_URL = `https://api.themoviedb.org/3/guest_session/${guestSessionId}/rated/movies?language=en-US&page=${page}&sort_by=created_at.asc`
    const res = await fetch(RATED_URL, this.options)
    if (!res.ok) {
      throw new Error('received ${res.status}')
    }
    const result = await res.json()
    return result
  }

  async getPopular(page) {
    const SEARCH_URL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}`
    const res = await fetch(SEARCH_URL, this.options)
    if (!res.ok) {
      throw new Error('received ${res.status}')
    }
    const result = await res.json()
    return result
  }

  async addRating(movieId, rating, guestSessionId) {
    // const guestSessionId = await this.defaultSession()
    const RATED_URL = `https://api.themoviedb.org/3/movie/${movieId}/rating?guest_session_id=${guestSessionId}`
    const res = await fetch(RATED_URL, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this.AUTH_TOKEN,
      },
      body: rating,
    })
    if (!res.ok) {
      throw new Error(`received ${res.status}`)
    }
    return res
  }

  async getRatedWithAccount(page) {
    const SEARCH_URL = `https://api.themoviedb.org/3/account/20399367/rated/movies?page=${page}`
    const res = await fetch(SEARCH_URL, this.options)
    if (!res.ok) {
      throw new Error('received ${res.status}')
    }
    const result = await res.json()
    return result
  }
}
