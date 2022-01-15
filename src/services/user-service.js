import $api from "../API/api";

export default class UserService {
  static async getUserInfo(userId) {
    return (await $api.get(`/info/user/${userId}`)).data
  }
}