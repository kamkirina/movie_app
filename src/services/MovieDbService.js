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

  async getResourse(search) {
    const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`
    const res = await fetch(SEARCH_URL, this.options)

    return res.json()
  }

  async getMovies(search) {
    const res = await this.getResourse(search)
    console.log(res)
    return res.results.map(this._transformResult)
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
}
