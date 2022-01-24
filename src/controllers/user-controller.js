import UserService from "../services/user-service";


export default class UserController {
  static async getUserInfo(userId) {
    try {
      return await UserService.getUserInfo(userId);
    } catch (err) {
      throw err;
    }
  }

  static async changeUsername(username, user_id) {
    try {
      return (await UserService.changeUsername(username, user_id)).username;
    } catch (err) {
      throw err;
    }
  }

  static async changeUserImage(image, user_id) {
    try {
      const formData = new FormData();
      formData.append(`image`, image);
      formData.append('user_id', user_id);
      await UserService.changeUserImage(formData);
    } catch (err) {
      throw err;
    }
  }

  static async getUserImage(user_id) {
    try {
      return (await UserService.getUserImage(user_id))
    } catch (err) {
      throw err;
    }
  }


}