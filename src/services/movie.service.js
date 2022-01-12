import instance from "../API/instance";
import $api from "../API/api";

export default class MovieService {
  static async getPopular() {
    return (await instance.get('/movie/popular')).data
  }

  static async getById(id) {
    return (await instance.get(`/movie/${id}?language=us`)).data
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

  static async getUserFilms(id, table) {
    return (await $api.get(`/films/${id}/${table}`)).data;
  }

}