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

  static async getFavourite(userId, page = 1, limit = 'ALL') {
    return (await $api.get(`/${userId}/films/favourite`, {params: {limit, page}})).data;
  }


  static async addFavourite(film_id, title) {
    return (await $api.post('/films/favourite/add', {film_id, title})).data;
  }

  static async removeFavourite(film_id) {
    return (await $api.post('/films/favourite/remove', {film_id})).data;
  }

  static async getLater(userId, page = 1, limit = 'ALL') {
    return (await $api.get(`/${userId}/films/later`, {params: {limit, page}})).data;
  }

  static async addLater(film_id, title) {
    return (await $api.post('/films/later/add', {film_id, title})).data;
  }

  static async removeLater(film_id) {
    return (await $api.post('/films/later/remove', {film_id})).data;
  }

  static async getRated(userId, page = 1, limit = 'ALL') {
    return (await $api.get(`/${userId}/films/rated`, {params: {limit, page}})).data;
  }

  static async addRated(film_id, rating, title) {
    return (await $api.post('/films/rated/add', {film_id, rating, title})).data;
  }

  static async removeRated(film_id) {
    return (await $api.post('/films/rated/remove', {film_id})).data;
  }

  static async getUserFilmInfo(filmId) {
    return (await $api.get(`/info/film/${filmId}`)).data;
  }

}