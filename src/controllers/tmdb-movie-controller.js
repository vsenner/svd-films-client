import TMDBMovieService from "../services/tmdb-movie-service";

export default class TMDBMovieController {
  static async getPopular() {
    try {
      return await TMDBMovieService.getPopular()
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await TMDBMovieService.getById(id)
    } catch (err) {
      throw err;
    }
  }

  static async getAllGenres() {
    try {
      return (await TMDBMovieService.getAllGenres())
    } catch (err) {
      throw err;
    }
  }

  static async search(query) {
    try {
      return TMDBMovieService.search(query).then(response => {
        return response.results.filter(elem => elem.media_type === 'movie' || elem.media_type === 'tv')
          .sort((a, b) => {
            return a.popularity - b.popularity
          })
          .reverse()
          .slice(0, 4)
      })
    } catch (err) {
      throw err
    }
  }

  static async getActorsById(id) {
    try {
      return (await TMDBMovieService.getCreditsById(id)).cast
    } catch (err) {
      throw err;
    }
  }

  static async getMovieDirectorById(id) {
    try {
      return TMDBMovieService.getCreditsById(id).then(resp => {
        return resp.crew.find(obj => obj.job === 'Director');
      })
    } catch (err) {
      throw err;
    }
  }
}