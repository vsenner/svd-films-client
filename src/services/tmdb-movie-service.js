import instance from "../API/instance";

export default class TMDBMovieService {
  static async getPopular() {
    return (await instance.get('/movie/popular')).data
  }

  static async getMovieById(id) {
    return (await instance.get(`/movie/${id}`)).data
  }

  static async getTVById(id) {
    return (await instance.get(`/tv/${id}`)).data
  }

  static async getAllGenres() {
    return (await instance.get('/genre/movie/list')).data
  }

  static async search(query) {
    return (await instance.get(`search/multi?language=en-US&query=${query}&page=1&include_adult=true`)).data
  }

  static async getMovieCreditsById(id) {
    return (await instance.get(`/movie/${id}/credits`)).data
  }

  static async getTVCreditsById(id) {
    return (await instance.get(`/tv/${id}/aggregate_credits`)).data
  }
}