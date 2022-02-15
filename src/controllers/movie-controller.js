import MovieService from "../services/movie-service";
import TMDBMovieService from "../services/tmdb-movie-service";

export default class MovieController {
  static async getFavourite(user_id) {
    try {
      const addedFilms = await MovieService.getFavourite(user_id);
      const detailedAddedFilms = addedFilms.map(film => TMDBMovieService.getMovieById(film.id));
      const films = await Promise.all(detailedAddedFilms);
      return films.map((film, index) => {
        return {
          ...addedFilms[index],
          title: film.title,
          year: film.release_date,
          rating: film.vote_average
        }
      })
    } catch (err) {
      throw err;
    }
  }

  static async addFavourite(film_id, user_id) {
    try {
      return await MovieService.addFavourite(film_id, user_id);
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
      const addedFilms = await MovieService.getLater(user_id);
      const detailedAddedFilms = addedFilms.map(film => TMDBMovieService.getMovieById(film.id));
      const films = await Promise.all(detailedAddedFilms);
      return films.map((film, index) => {
        return {
          ...addedFilms[index],
          title: film.title,
          year: film.release_date,
          rating: film.vote_average
        }
      })
    } catch (err) {
      throw err;
    }
  }

  static async addLater(film_id, user_id) {
    try {
      return await MovieService.addLater(film_id, user_id);
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
      const addedFilms = await MovieService.getRated(user_id);
      const detailedAddedFilms = addedFilms.map(film => TMDBMovieService.getMovieById(film.id));
      const films = await Promise.all(detailedAddedFilms);
      return films.map((film, index) => {
        return {
          ...addedFilms[index],
          title: film.title,
          year: film.release_date,
          rating: film.vote_average
        }
      })
    } catch (err) {
      throw err;
    }
  }

  static async addRated(film_id, rating, user_id) {
    try {
      return await MovieService.addRated(film_id, rating, user_id);
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