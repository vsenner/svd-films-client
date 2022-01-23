import $api from "../API/api";

const BASE_PATH = 'authorized/user'

export default class UserService {
  static async getUserInfo(userId) {
    try {
      return (await $api.get(`${BASE_PATH}/info/user/${userId}`)).data
    } catch (err) {
      throw err;
    }
  }

  static async changeUsername(username, user_id) {
    return (await $api.post(`${BASE_PATH}/username/change`, {username, user_id})).data
  }

  static async changeUserImage(formData) {
    return (await $api.post(`${BASE_PATH}/image/change`, formData)).data
  }
}