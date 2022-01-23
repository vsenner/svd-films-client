import instance from "../API/instance";
import $api from "../API/api";

export default class MovieService {
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

  static async getFavourite(user_id, page = 1, limit = 'ALL') {
    return (await $api.get(`/${user_id}/films/favourite`, {params: {limit, page}})).data;
  }


  static async addFavourite(film_id, title, user_id) {
    return (await $api.post('/films/favourite/add', {film_id, title, user_id})).data;
  }

  static async removeFavourite(film_id, user_id) {
    return (await $api.post('/films/favourite/remove', {film_id, user_id})).data;
  }

  static async getLater(user_id, page = 1, limit = 'ALL') {
    return (await $api.get(`/${user_id}/films/later`, {params: {limit, page}})).data;
  }

  static async addLater(film_id, title, user_id) {
    return (await $api.post('/films/later/add', {film_id, title, user_id})).data;
  }

  static async removeLater(film_id, user_id) {
    return (await $api.post('/films/later/remove', {film_id, user_id})).data;
  }

  static async getRated(user_id, page = 1, limit = 'ALL') {
    return (await $api.get(`/${user_id}/films/rated`, {params: {limit, page}})).data;
  }

  static async addRated(film_id, rating, title, user_id) {
    return (await $api.post('/films/rated/add', {film_id, rating, title, user_id})).data;
  }

  static async removeRated(film_id, user_id) {
    return (await $api.post('/films/rated/remove', {film_id, user_id})).data;
  }

  static async getUserFilmInfo(film_id, user_id) {
    return (await $api.get(`/info/film/${film_id}/${user_id}`)).data;
  }

}