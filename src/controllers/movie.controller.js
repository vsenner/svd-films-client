import MovieService from "../services/movie.service";

export default class MovieController {
  static async getPopular() {
    try {
      return await MovieService.getPopular()
    } catch (err) {
      throw err;
    }
  }

  static async getById(id) {
    try {
      return await MovieService.getById(id)
    } catch (err) {
      throw err;
    }
  }

  static async getAllGenres() {
    try {
      return (await MovieService.getAllGenres())
    } catch (err) {
      throw err;
    }
  }

  static async search(query) {
    try {
      return MovieService.search(query).then(response => {
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
      return (await MovieService.getCreditsById(id)).cast
    } catch (err) {
      throw err;
    }
  }

  static async getMovieDirectorById(id) {
    try {
      return MovieService.getCreditsById(id).then(resp => {
        return resp.crew.find(obj => obj.job === 'Director');
      })
    } catch (err) {
      throw err;
    }
  }

  static getImage(path) {
    return `https://image.tmdb.org/t/p/w500${path}`
  }
}