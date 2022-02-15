

import instance from "../API/instance";

export default class TMDBMovieService {
  static async getPopular() {
    return (await instance.get('/movie/popular')).data
  }

  static async getById(id) {
    return (await instance.get(`/movie/${id}`)).data
  }

  static async getAllMovieGenres() {
    return (await instance.get('/genre/movie/list')).data
  }

  static async getAllSeriesGenres() {
    return (await instance.get('/genre/tv/list')).data
  }

  static async search(query) {
    return (await instance.get(`search/multi?language=en-US&query=${query}&page=1&include_adult=true`)).data
  }

  static async getCreditsById(id) {
    return (await instance.get(`/movie/${id}/credits`)).data
  }

  static async getTVs() {
    try {
      return (await instance.get(`/tv/popular`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async getMoviesByGenres(genresYes, genresNo, sortParam='popularity.desc',page){
    try {
      const vote_counts = sortParam==='vote_average.desc'?5000:500
      return (await instance.get(`/discover/movie?page=${page}&language=en-US&with_genres=${genresYes}&without_genres=${genresNo}&sort_by=${sortParam}&primary_release_date.lte=${Date.now()}&vote_count.gte=${vote_counts}`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async getSeriesByGenres(genresYes, genresNo, sortParam='popularity.desc',page){
    try {
      const vote_counts = sortParam==='vote_average.desc'?5000:500
      return (await instance.get(`/discover/tv?page=${page}&language=en-US&with_genres=${genresYes}&without_genres=${genresNo}&sort_by=${sortParam}&primary_release_date.lte=${Date.now()}&vote_count.gte=${vote_counts}`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }
}