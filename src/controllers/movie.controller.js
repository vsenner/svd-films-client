import MovieService from "../services/movie.service";

export default class MovieController {
  static async getPopular() {
    try{
      return await MovieService.getPopular()
    }catch (err) {
      throw err;
    }
  }

  static async getAllGenres() {
    try {
      return (await MovieService.getAllGenres())
    } catch (err) {
      throw err;
    }
  }

  static async search(query) {
    try{
      return MovieService.search(query).then(response => {
        return response.results.filter(elem => elem.media_type === 'movie' || elem.media_type === 'tv')
          .sort((a,b) => {
            return a.popularity - b.popularity
          })
          .reverse()
          .slice(0, 4)
      })
    }catch (e) {
      throw e
    }
  }
}