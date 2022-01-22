import $api from "../API/api";

export default class UserService {
  static async getUserInfo(userId) {
    try {
      return (await $api.get(`/info/user/${userId}`)).data
    } catch (err) {
      throw err;
    }
  }

  static async changeUsername(username) {
    return (await $api.post('/username/change', {username})).data
  }

  static async changeUserImage(formData) {
    return (await $api.post('/image/change', formData)).data
  }
}