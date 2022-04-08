export enum mediaTypes {
  ALL = 'all',
  MOVIE = 'movie',
  TV = 'tv'
}

interface IMedia {
  media_type?: string,
  backdrop_path: string,
  genre_ids: number[],
  id: number,
  original_language: string,
  overview: string,
  popularity: number,
  poster_path: string,
  vote_average: number,
  vote_count: number
}

export interface IMovie extends IMedia {
  adult: boolean,
  original_title: string,
  release_date: string,
  title: string,
  video: boolean,
}

export interface ITv extends IMedia {
  first_air_date: string,
  name: string,
  origin_country: string[],
  original_name: string,
}