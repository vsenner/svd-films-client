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

  static async getFavourite(user_id) {
    try {
      return await MovieService.getFavourite(user_id);
    } catch (err) {
      throw err;
    }
  }

  static async addFavourite(film_id, title, user_id) {
    try {
      return await MovieService.addFavourite(film_id, title, user_id);
    } catch (err) {
      throw err;
    }
  }
  static async removeFavourite(film_id, user_id) {
    try {
      return await MovieService.removeFavourite(film_id, user_id);
    } catch (err) {
      throw err;
    }
  }

  static async getLater(user_id) {
    try {
      return await MovieService.getLater(user_id);
    } catch (err) {
      throw err;
    }
  }

  static async addLater(film_id, title, user_id) {
    try {
      return await MovieService.addLater(film_id, title, user_id);
    } catch (err) {
      throw err;
    }
  }

  static async removeLater(film_id, user_id) {
    try {
      return await MovieService.removeLater(film_id, user_id);
    } catch (err) {
      throw err;
    }
  }

  static async getRated(user_id) {
    try {
      return await MovieService.getRated(user_id);
    } catch (err) {
      throw err;
    }
  }

  static async addRated(film_id, rating, title, user_id) {
    try {
      return await MovieService.addRated(film_id, rating, title, user_id);
    } catch (err) {
      throw err;
    }
  }

  static async removeRated(film_id, user_id) {
    try {
      return await MovieService.removeRated(film_id, user_id);
    } catch (err) {
      throw err;
    }
  }

  static async getUserFilmInfo(film_id, user_id) {
    try {
      return await MovieService.getUserFilmInfo(film_id, user_id);
    } catch (err) {
      throw err;
    }
  }

}