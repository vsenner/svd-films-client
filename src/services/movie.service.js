import instance from "../API";

export default class MovieService {
  static async getPopular() {
    try {
      const URL = '/movie/popular'
      return await instance.get(URL)
    } catch (err) {
      throw new Error('Server Error!')
    }
  }
}