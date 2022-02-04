import instance from "../API/instance";

export default class TMDBMovieService {
  static async getPopular() {
    return (await instance.get('/movie/popular')).data
  }

  static async getById(id) {
    return (await instance.get(`/movie/${id}`)).data
  }

  static async getAllGenres() {
    return (await instance.get('/genre/movie/list')).data
  }

  static async search(query) {
    return (await instance.get(`search/multi?language=en-US&query=${query}&page=1&include_adult=true`)).data
  }

  static async getCreditsById(id) {
    return (await instance.get(`/movie/${id}/credits`)).data
  }

  static async getTVs() {
    try {
      return (await instance.get(`/tv/popular`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async getMoviesByGenres(genresYes, genresNo, sortParam='popularity.desc'){
    try {
      return (await instance.get(`/discover/movie?language=en-US&with_genres=${genresYes}&without_genres=${genresNo}&sort_by=${sortParam}`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }
}