import UserService from "../services/user-service";

export default class UserController {
  static async getUserInfo(userId) {
    try {
      return await UserService.getUserInfo(userId)
    } catch (err) {
      throw err;
    }
  }
}