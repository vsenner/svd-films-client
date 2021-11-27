import MovieService from "../services/movie.service";

export default class MovieController {
  static async getPopular() {
    try{
      return MovieService.getPopular().then(
        (resp) => resp.data
      )
    }catch (err) {
      throw err;
    }
  }
}