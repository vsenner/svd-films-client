import instance from "../API";

export default class MovieService {
  static async getPopular() {
    try {
      return await instance.get('/movie/popular')
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async getAllGenres() {
    try {
      return await instance.get('/genre/movie/list');
    } catch (err) {
      throw new Error('Server Error!')
    }
  }
}