import TmdbMediaService from "../services/tmdb-media-service";
import {IMovie, ITv, mediaTypes} from "../models/media";
import {sortMethods} from "../models/sortMethods";

interface chosenGenres {
  yes: number[],
  no: number[]
}

interface selectedGenre {
  id: number,
  select: boolean
}

export default class TmdbMediaController {
  static async getPopular() {
    try {
      return await TmdbMediaService.getPopularMovies()
    } catch (err) {
      throw err;
    }
  }

  static async getMovieById(id: number) {
    try {
      return await TmdbMediaService.getMovieById(id)
    } catch (err) {
      throw err;
    }
  }

  static async getAllMovieGenres() {
    try {
      const bannedGenreIds = [16]
      return TmdbMediaService.getAllMovieGenres().then((data) => {
        return data.genres.filter(genre => !bannedGenreIds.includes(genre.id));
      })
    } catch (err) {
      throw err;
    }
  }

  static async getTVById(id: number) {
    try {
      return await TmdbMediaService.getTVById(id)
    } catch (err) {
      throw err;
    }
  }

  static async getAllTVGenres() {
    try {
      const bannedGenreIds = [16, 10767, 10763, 10764]
      return TmdbMediaService.getAllSeriesGenres().then((data) => {
        return data.genres.filter(genre => !bannedGenreIds.includes(genre.id))
      })
    } catch (err) {
      throw err;
    }
  }

  static async getAllCartoonGenres() {
    try {
      const bannedGenreIds = [16]
      return TmdbMediaService.getAllMovieGenres().then((data) => {
        return data.genres.filter(genreIt => !bannedGenreIds.includes(genreIt.id))
      })
    } catch (err) {
      throw err;
    }
  }

  static async mediaTypeSearch(query: string, type: string, page: number = 1) {
    try {
      let list: { results: (IMovie | ITv)[] };
      switch (type) {
        case 'all': {
          list = await TmdbMediaService.multiSearch(query, page);
          break;
        }
        case 'movie': {
          list = await TmdbMediaService.movieSearch(query, page);
          break;
        }
        case 'tv': {
          list = await TmdbMediaService.tvSearch(query, page);
          break;
        }
        default: {
          return null;
        }
      }
      list.results = list.results.filter(elem => elem.media_type !== 'person');
      return list;

    } catch (e) {
      throw Error(`mediaTypeSearch ${e}`);
    }
  }

  static async navbarSearch(query: string, type: string) {
    try {
      return this.mediaTypeSearch(query, type)
        .then(data => {
            return {
              ...data,
              list: data?.results.sort((a, b) => b.popularity - a.popularity)
                .slice(0, 4)
            }
          }
        );
    } catch (err) {
      throw err
    }
  }

  static async search(query: string, type: string, sortMethod: string, page: number, media_type: string) {
    try {
      return this.mediaTypeSearch(query, type, page)
        .then(data => {
          if (sortMethod === sortMethods.PRIMARY_RELEASE_DATE) {
            switch (media_type) {
              case mediaTypes.MOVIE:
                sortMethod = sortMethods.MOVIE_RELEASE_DATE;
                break;
              case mediaTypes.TV:
                sortMethod = sortMethods.TV_RELEASE_DATE;
            }
          }
          return {
            ...data,
            list: data?.results.sort((a, b) => {
              if (sortMethod === sortMethods.PRIMARY_RELEASE_DATE) {
                const aSortMethod = a.media_type === mediaTypes.MOVIE ? sortMethods.MOVIE_RELEASE_DATE : sortMethods.TV_RELEASE_DATE;
                const bSortMethod = b.media_type === mediaTypes.MOVIE ? sortMethods.MOVIE_RELEASE_DATE : sortMethods.TV_RELEASE_DATE;
                // @ts-ignore
                return b[bSortMethod].split('-')[0] - a[aSortMethod].split('-')[0]
              }
              if (sortMethod === sortMethods.TV_RELEASE_DATE || sortMethod === sortMethods.MOVIE_RELEASE_DATE) {
                // @ts-ignore
                return b[sortMethod].split('-')[0] - a[sortMethod].split('-')[0]
              }
              // @ts-ignore
              return b[sortMethod] - a[sortMethod]
            })
          }
        });
    } catch (err) {
      throw err
    }
  }

  static async getMovieActorsById(id: number) {
    try {
      return (await TmdbMediaService.getMovieCreditsById(id)).cast
    } catch (err) {
      throw err;
    }
  }

  static async getMovieDirectorById(id: number) {
    try {
      return TmdbMediaService.getMovieCreditsById(id).then(data => {
        return data.crew.find(crew => crew.job === 'Director');
      })
    } catch (err) {
      throw err;
    }
  }

  static async getTVActorsById(id: number) {
    try {
      return (await TmdbMediaService.getTVCreditsById(id)).cast
    } catch (err) {
      throw err;
    }
  }

  static async getTVDirectorById(id: number) {
    try {
      return TmdbMediaService.getTVCreditsById(id).then(resp => {
        return resp.crew.filter(crew => crew.job === 'Director');
      })
    } catch (err) {
      throw err;
    }
  }


  static async getTVSeries() {
    try {
      const TVs = (await TmdbMediaService.getPopularTVs()).results;
      return TVs.filter(TV => TV.genre_ids.findIndex(id => id === (10764 || 10763 || 10767)) === -1)
    } catch (err) {
      throw err
    }
  }

  static async getTVShows() {
    try {
      const TVs = (await TmdbMediaService.getPopularTVs()).results;
      return TVs.filter(TV => TV.genre_ids.findIndex(id => id === (10764 || 10763 || 10767)) !== -1)
    } catch (err) {
      throw err
    }
  }

  static async getCartoons() {
    try {
      const cartoons = (await TmdbMediaService.getPopularMovies()).results;
      return cartoons.filter(cartoon => (cartoon.genre_ids.findIndex(id => id === 16)) !== -1)
    } catch (err) {
      throw err
    }
  }

  static async getMoviesWithGenres(genres: selectedGenre[], sortParam: string, page: number) {
    try {
      const genresObj: chosenGenres = genres.reduce((prev: chosenGenres, genre) => {
        if (genre.select) {
          return {...prev, yes: [...prev?.yes, genre.id]}
        } else {
          return {...prev, no: [...prev?.no, genre.id]}
        }
      }, {yes: [], no: []})
      return await TmdbMediaService.getMoviesByGenres(genresObj.yes, genresObj.no, sortParam, page);
    } catch (err) {
      throw err
    }
  }

  static async getSeriesWithGenres(genres: selectedGenre[], sortParam: sortMethods, page: number) {
    try {
      const genresObj: chosenGenres = genres.reduce((prev: chosenGenres, genre) => {
        if (genre.select) {
          return {...prev, yes: [...prev?.yes, genre.id]}
        } else {
          return {...prev, no: [...prev?.no, genre.id]}
        }
      }, {yes: [], no: [16, 10767, 10763, 10764]})

      return await TmdbMediaService.getTVsByGenres(genresObj.yes, genresObj.no, sortParam, page)
    } catch (err) {
      throw err
    }
  }

  static async getMovieTrailers(id: number) {
    try {
      const videos = (await TmdbMediaService.getMovieVideos(id)).results;
      return videos.filter((video) => video.type === 'Trailer')
    } catch (err) {
      throw err;
    }
  }

  static async getTVTrailers(id: number) {
    try {
      const videos = (await TmdbMediaService.getTVVideos(id)).results;
      return videos.filter((video) => video.type === 'Trailer');
    } catch (err) {
      throw err;
    }
  }

}




