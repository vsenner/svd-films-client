import instance from "../API/instance";
import {IMovie} from "../models/media";

export default class TmdbMediaService {
  static async getPopular() {
    return (await instance.get('/movie/popular')).data
  }

  static async getMovieById(id: number) {
    return (await instance.get(`/movie/${id}`)).data
  }

  static async getTVById(id: number) {
    return (await instance.get(`/tv/${id}`)).data
  }

  static async getAllMovieGenres() {
    return (await instance.get('/genre/movie/list')).data
  }

  static async getMovieCreditsById(id: number) {
    return (await instance.get(`/movie/${id}/credits`)).data
  }

  static async getAllSeriesGenres() {
    return (await instance.get('/genre/tv/list')).data
  }

  static async multiSearch(query: string, page = 1) {
    return (await instance.get(`search/multi?language=en-US&query=${query}&page=${page}&include_adult=true`)).data
  }

  static async tvSearch(query: string, page = 1) {
    return (await instance.get(`search/tv?language=en-US&query=${query}&page=${page}&include_adult=true`)).data
  }

  static async movieSearch(query: string, page = 1) : Promise<{page: number, results: IMovie[]}> {
    return (await instance.get(`search/movie?language=en-US&query=${query}&page=${page}&include_adult=true`)).data
  }

  static async getTVCreditsById(id: number) {
    return (await instance.get(`/tv/${id}/aggregate_credits`)).data
  }

  static async getCreditsById(id: number) {
    return (await instance.get(`/movie/${id}/credits`)).data
  }

  static async getTVs() {
    try {
      return (await instance.get(`/tv/popular`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async getMoviesByGenres(genresYes: number[], genresNo: number[], sortParam: string = 'popularity.desc', page: number){
    try {
      const vote_counts = sortParam==='vote_average.desc'? 5000:500
      return (await instance.get(`/discover/movie?page=${page}&language=en-US&with_genres=${genresYes}&without_genres=${genresNo}&sort_by=${sortParam}&primary_release_date.lte=${Date.now()}&vote_count.gte=${vote_counts}`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async getSeriesByGenres(genresYes: number[], genresNo: number[], sortParam: string = 'popularity.desc', page: number){
    try {
      const vote_counts = sortParam==='vote_average.desc'? 5000:500
      return (await instance.get(`/discover/tv?page=${page}&language=en-US&with_genres=${genresYes}&without_genres=${genresNo}&sort_by=${sortParam}&primary_release_date.lte=${Date.now()}&vote_count.gte=${vote_counts}`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async getMovieVideos(id: number) {
    try {
      return (await instance.get(`/movie/${id}/videos`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async getTVVideos(id: number) {
    try {
      return (await instance.get(`/tv/${id}/videos`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }
}