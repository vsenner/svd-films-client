import instance from "../API/instance";
import {IGenre, IMovie, ITv, IVideo} from "../models/media";
import {ICast, ICrew} from "../models/credits";

interface IMediaData {
  page: number,
  total_pages: number,
  total_results: number,
  results: (IMovie|ITv)[]
}

interface ICredits {
  id: number,
  cast: ICast[],
  crew: ICrew[]
}

export default class TmdbMediaService {
  static async getPopularMovies(): Promise<IMediaData> {
    return (await instance.get('/movie/popular')).data
  }

  static async getPopularTVs(): Promise<IMediaData> {
    try {
      return (await instance.get(`/tv/popular`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async getMovieById(id: number): Promise<IMovie> {
    return (await instance.get(`/movie/${id}`)).data
  }

  static async getTVById(id: number): Promise<ITv> {
    return (await instance.get(`/tv/${id}`)).data
  }

  static async getAllMovieGenres(): Promise<{ genres: IGenre[] }> {
    return (await instance.get('/genre/movie/list')).data
  }

  static async getMovieCreditsById(id: number): Promise<ICredits> {
    return (await instance.get(`/movie/${id}/credits`)).data
  }

  static async getTVCreditsById(id: number): Promise<ICredits> {
    return (await instance.get(`/tv/${id}/aggregate_credits`)).data
  }

  static async getAllSeriesGenres(): Promise<{ genres: IGenre[] }> {
    return (await instance.get('/genre/tv/list')).data
  }

  static async multiSearch(query: string, page = 1): Promise<IMediaData> {
    return (await instance.get(`search/multi?language=en-US&query=${query}&page=${page}&include_adult=true`)).data
  }

  static async tvSearch(query: string, page = 1): Promise<IMediaData> {
    return (await instance.get(`search/tv?language=en-US&query=${query}&page=${page}&include_adult=true`)).data
  }

  static async movieSearch(query: string, page = 1): Promise<IMediaData> {
    return (await instance.get(`search/movie?language=en-US&query=${query}&page=${page}&include_adult=true`)).data
  }

  static async getMoviesByGenres(genresYes: number[], genresNo: number[], sortParam: string = 'popularity.desc', page: number): Promise<{ results: IMovie[] }> {
    try {
      const vote_counts = sortParam === 'vote_average.desc' ? 5000 : 500
      return (await instance.get(`/discover/movie?page=${page}&language=en-US&with_genres=${genresYes}&without_genres=${genresNo}&sort_by=${sortParam}&primary_release_date.lte=${Date.now()}&vote_count.gte=${vote_counts}`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async getTVsByGenres(genresYes: number[], genresNo: number[], sortParam: string = 'popularity.desc', page: number): Promise<{ results: ITv[] }> {
    try {
      const vote_counts: number = sortParam === 'vote_average.desc' ? 5000 : 500
      return (await instance.get(`/discover/tv?page=${page}&language=en-US&with_genres=${genresYes}&without_genres=${genresNo}&sort_by=${sortParam}&primary_release_date.lte=${Date.now()}&vote_count.gte=${vote_counts}`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async getMovieVideos(id: number): Promise<{ results: IVideo[] }> {
    try {
      return (await instance.get(`/movie/${id}/videos`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }

  static async getTVVideos(id: number): Promise<{ results: IVideo[] }> {
    try {
      return (await instance.get(`/tv/${id}/videos`)).data
    } catch (err) {
      throw new Error('Server Error!')
    }
  }
}