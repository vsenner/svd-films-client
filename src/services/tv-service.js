import $api from "../API/api";

const BASE_PATH = '/authorized/tv'

export default class TVService {

  static async getFavourite(user_id, page = 1, limit = 'ALL') {
    return (await $api.get(`${BASE_PATH}/${user_id}/favourite`, {params: {limit, page}})).data;
  }

  static async addFavourite(tv_id, user_id) {
    return (await $api.post(`${BASE_PATH}/favourite/add`, {tv_id, user_id})).data;
  }

  static async removeFavourite(tv_id, user_id) {
    return (await $api.post(`${BASE_PATH}/favourite/remove`, {tv_id, user_id})).data;
  }

  static async getLater(user_id, page = 1, limit = 'ALL') {
    return (await $api.get(`${BASE_PATH}/${user_id}/later`, {params: {limit, page}})).data;
  }

  static async addLater(tv_id, user_id) {
    return (await $api.post(`${BASE_PATH}/later/add`, {tv_id, user_id})).data;
  }

  static async removeLater(tv_id, user_id) {
    return (await $api.post(`${BASE_PATH}/later/remove`, {tv_id, user_id})).data;
  }

  static async getRated(user_id, page = 1, limit = 'ALL') {
    return (await $api.get(`${BASE_PATH}/${user_id}/rated`, {params: {limit, page}})).data;
  }

  static async addRated(tv_id, rating, user_id,title) {
    return (await $api.post(`${BASE_PATH}/rated/add`, {tv_id, rating, user_id,title})).data;
  }

  static async removeRated(tv_id, user_id) {
    return (await $api.post(`${BASE_PATH}/rated/remove`, {tv_id, user_id})).data;
  }

  static async getUserTVInfo(tv_id, user_id) {
    return (await $api.get(`${BASE_PATH}/info/${tv_id}/${user_id}`)).data;
  }

}