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

  static async getFavourite(id) {
    try {
      return await MovieService.getFavourite(id);
    } catch (err) {
      throw err;
    }
  }

  static async addFavourite(filmId, title) {
    try {
      return await MovieService.addFavourite(filmId, title);
    } catch (err) {
      throw err;
    }
  }
  static async removeFavourite(filmId) {
    try {
      return await MovieService.removeFavourite(filmId);
    } catch (err) {
      throw err;
    }
  }

  static async getLater(id) {
    try {
      return await MovieService.getLater(id);
    } catch (err) {
      throw err;
    }
  }

  static async addLater(filmId, title) {
    try {
      return await MovieService.addLater(filmId, title);
    } catch (err) {
      throw err;
    }
  }

  static async removeLater(filmId) {
    try {
      return await MovieService.removeLater(filmId);
    } catch (err) {
      throw err;
    }
  }

  static async getRated(userId) {
    try {
      return await MovieService.getRated(userId);
    } catch (err) {
      throw err;
    }
  }

  static async addRated(filmId, rating, title) {
    try {
      return await MovieService.addRated(filmId, rating, title);
    } catch (err) {
      throw err;
    }
  }

  static async removeRated(filmId) {
    try {
      return await MovieService.removeRated(filmId);
    } catch (err) {
      throw err;
    }
  }

  static async getUserFilmInfo(filmId) {
    try {
      return await MovieService.getUserFilmInfo(filmId);
    } catch (err) {
      throw err;
    }
  }

}