import TMDBMovieService from "../services/tmdb-movie-service";

export default class TMDBMovieController {
  static async getPopular() {
    try {
      return await TMDBMovieService.getPopular()
    } catch (err) {
      throw err;
    }
  }

  static async getMovieById(id) {
    try {
      return await TMDBMovieService.getMovieById(id)
    } catch (err) {
      throw err;
    }
  }

  static async getTVById(id) {
    try {
      return await TMDBMovieService.getTVById(id)
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

  static async getMovieActorsById(id) {
    try {
      return (await TMDBMovieService.getMovieCreditsById(id)).cast
    } catch (err) {
      throw err;
    }
  }

  static async getMovieDirectorById(id) {
    try {
      return TMDBMovieService.getMovieCreditsById(id).then(resp => {
        return resp.crew.find(obj => obj.job === 'Director');
      })
    } catch (err) {
      throw err;
    }
  }

  static async getTVActorsById(id) {
    try {
      return (await TMDBMovieService.getTVCreditsById(id)).cast
    } catch (err) {
      throw err;
    }
  }

  static async getTVDirectorById(id) {
    try {
      return TMDBMovieService.getTVCreditsById(id).then(resp => {
        return resp.crew.filter(obj => obj.jobs.find(job => job.job === 'Director'));
      })
    } catch (err) {
      throw err;
    }
  }
}