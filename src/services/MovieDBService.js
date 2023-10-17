const baseURL = 'https://api.themoviedb.org'
const apiKey = '877a5628aaa5440d46c8e74e3ef1b83c'

export default class MovieDBService {
  async getResults(url) {
    return await fetch(baseURL + url + '&api_key=' + apiKey)
      .then((response) => response.json())
      .catch((err) => {
        throw new Error(err)
      })
  }
  async ratedMovies(url, body) {
    return await fetch(baseURL + url, {
      method: 'POST',
      headers: { accept: 'application/json', 'Content-Type': 'application/json;charset=utf-8' },
      body: body,
    })
      .then((response) => response.json())
      .catch((err) => {
        throw new Error(err)
      })
  }

  guestSession = async () => {
    return await fetch(baseURL + '/3/authentication/guest_session/new', {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzdhNTYyOGFhYTU0NDBkNDZjOGU3NGUzZWYxYjgzYyIsInN1YiI6IjY0ZjZmNDQyYjIzNGI5MDExZDUxMTYxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._wsryJxbFamh2LgJUkDPdmIqrBDG14U8a48y0nr2AmU',
      },
    })
      .then((response) => response.json())
      .catch((err) => {
        throw new Error(err)
      })
  }

  getGenres = async () => {
    return await this.getResults('/3/genre/movie/list?language=en')
  }
  searchFilms = async ({ keywords, includeAdult = false, page = 1 }) => {
    let includeAdultParse = includeAdult ? 'true' : 'false'
    return await this.getResults(
      '/3/search/movie?include_adult=' +
        includeAdultParse +
        '&language=en-US&page=' +
        String(page) +
        '&query=' +
        keywords
    )
  }
  addRate = async ({ id, guestId, value }) => {
    return await this.ratedMovies(`/3/movie/${id}/rating?guest_session_id=${guestId}&api_key=${apiKey}`, value)
  }
  getRates = async ({ guestId, page }) => {
    return await this.getResults(`/3/guest_session/${guestId}/rated/movies?page=${page}`)
  }
}
