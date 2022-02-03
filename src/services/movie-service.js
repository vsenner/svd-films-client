import $api from "../API/api";

const BASE_PATH = '/authorized/film'

export default class MovieService {

  static async getFavourite(user_id, page = 1, limit = 'ALL') {
    return (await $api.get(`${BASE_PATH}/${user_id}/favourite`, {params: {limit, page}})).data;
  }

  static async addFavourite(film_id, user_id) {
    return (await $api.post(`${BASE_PATH}/favourite/add`, {film_id, user_id})).data;
  }

  static async removeFavourite(film_id, user_id) {
    return (await $api.post(`${BASE_PATH}/favourite/remove`, {film_id, user_id})).data;
  }

  static async getLater(user_id, page = 1, limit = 'ALL') {
    return (await $api.get(`${BASE_PATH}/${user_id}/later`, {params: {limit, page}})).data;
  }

  static async addLater(film_id, user_id) {
    return (await $api.post(`${BASE_PATH}/later/add`, {film_id, user_id})).data;
  }

  static async removeLater(film_id, user_id) {
    return (await $api.post(`${BASE_PATH}/later/remove`, {film_id, user_id})).data;
  }

  static async getRated(user_id, page = 1, limit = 'ALL') {
    return (await $api.get(`${BASE_PATH}/${user_id}/rated`, {params: {limit, page}})).data;
  }

  static async addRated(film_id, rating, user_id) {
    return (await $api.post(`${BASE_PATH}/rated/add`, {film_id, rating, user_id})).data;
  }

  static async removeRated(film_id, user_id) {
    return (await $api.post(`${BASE_PATH}/rated/remove`, {film_id, user_id})).data;
  }

  static async getUserFilmInfo(film_id, user_id) {
    return (await $api.get(`${BASE_PATH}/info/${film_id}/${user_id}`)).data;
  }

}