import MovieService from "../services/movie-service";
import TmdbMediaService from "../services/tmdb-media-service";

export default class MovieController {

  static async getMovieList(id_list) {
    const films = await Promise.allSettled(id_list.map(film => TmdbMediaService.getMovieById(film.id)));
    return films.reduce((prev, film, index) => {
      if(film.status === 'fulfilled'){
        return [...prev, {
          ...id_list[index],
          title: film.value.title,
          year: (new Date(film.value.release_date ?? Date.now())).getFullYear(),
          rating: film.value.vote_average
        }];
      }
      return prev
    },[])
  }

  static async getFavourite(user_id) {
    const addedFilms = await MovieService.getFavourite(user_id);
    return await this.getMovieList(addedFilms);
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
    const addedFilms = await MovieService.getLater(user_id);
    return await this.getMovieList(addedFilms);
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
    const addedFilms = await MovieService.getRated(user_id);
    return await this.getMovieList(addedFilms);
  }

  static async addRated(film_id, rating, user_id,title) {
    try {
      return await MovieService.addRated(film_id, rating, user_id, title);
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