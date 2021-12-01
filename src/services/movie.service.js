import instance from "../API";

export default class MovieService {
  static async getPopular() {
    try {
      return (await instance.get('/movie/popular')).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async search(query) {
    try {
      return (await instance.get(`search/multi?language=en-US&query=${query}&page=1&include_adult=true`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }
}