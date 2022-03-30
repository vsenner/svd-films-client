import TmdbMediaService from "../services/tmdb-media-service";

export default class TmdbMediaController {
  static async getPopular() {
    try {
      return await TmdbMediaService.getPopular()
    } catch (err) {
      throw err;
    }
  }

  static async getMovieById(id) {
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
        return data.genres.filter(genreIt => !bannedGenreIds.includes(genreIt.id))
      })
    } catch (err) {
      throw err;
    }
  }

  static async getTVById(id) {
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
        return data.genres.filter(genreIt => !bannedGenreIds.includes(genreIt.id))
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

  static async mediaTypeSearch(query, type, page = 1) {
    try {
      let list = [];
      switch (type) {
        case 'all': {
          console.log('ALL')
          list = await TmdbMediaService.multiSearch(query, page);
          break;
        }
        case 'movie': {
          console.log('MOVIE')
          list = await TmdbMediaService.movieSearch(query, page);
          break;
        }
        case 'tv': {
          console.log('TV')
          list = await TmdbMediaService.tvSearch(query, page);
          break;
        }
        default: {
          return [];
        }
      }
      return {
        list: list.results.filter(elem => elem.media_type !== 'person'),
        total_pages: list.total_pages
      };

    } catch (e) {
      throw Error(`mediaTypeSearch ${e}`);
    }
  }

  static async navbarSearch(query, type) {
    try {
      return this.mediaTypeSearch(query, type)
        .then(response => {
            return {
              ...response,
              list: response.list.sort((a, b) => b.popularity - a.popularity)
                .slice(0, 4)
            }
          }
        );
    } catch (err) {
      throw err
    }
  }

  static async search(query, type, sortMethod, page) {
    try {
      return this.mediaTypeSearch(query, type, page)
        .then(response => {
          return {
            ...response,
            list: response.list.sort((a, b) => b[sortMethod] - a[sortMethod])
          }
        });
    } catch (err) {
      throw err
    }
  }

  static async getMovieActorsById(id) {
    try {
      return (await TmdbMediaService.getMovieCreditsById(id)).cast
    } catch (err) {
      throw err;
    }
  }

  static async getMovieDirectorById(id) {
    try {
      return TmdbMediaService.getMovieCreditsById(id).then(resp => {
        return resp.crew.find(obj => obj.job === 'Director');
      })
    } catch (err) {
      throw err;
    }
  }

  static async getTVActorsById(id) {
    try {
      return (await TmdbMediaService.getTVCreditsById(id)).cast
    } catch (err) {
      throw err;
    }
  }

  static async getTVDirectorById(id) {
    try {
      return TmdbMediaService.getTVCreditsById(id).then(resp => {
        return resp.crew.filter(obj => obj.jobs.find(job => job.job === 'Director'));
      })
    } catch (err) {
      throw err;
    }
  }


  static async getTVSeries() {
    try {
      const TVs = (await TmdbMediaService.getTVs()).results;
      return TVs.filter(TV => TV.genre_ids.findIndex(id => id === (10764 || 10763 || 10767)) === -1)
    } catch (err) {
      throw err
    }
  }

  static async getTVShows() {
    try {
      const TVs = (await TmdbMediaService.getTVs()).results;
      return TVs.filter(TV => TV.genre_ids.findIndex(id => id === (10764 || 10763 || 10767)) !== -1)
    } catch (err) {
      throw err
    }
  }

  static async getCartoons() {
    try {
      const cartoons = (await TmdbMediaService.getPopular()).results;
      return cartoons.filter(cartoon => (cartoon.genre_ids.findIndex(id => id === 16)) !== -1)

    } catch (err) {
      throw err
    }
  }

  static async getMoviesWithGenres(genres, sortParam, page) {
    try {
      const genresObj = genres.reduce((prev, genre) => {
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

  static async getSeriesWithGenres(genres, sortParam, page) {
    try {
      const genresObj = genres.reduce((prev, genre) => {
        if (genre.select) {
          return {...prev, yes: [...prev?.yes, genre.id]}
        } else {
          return {...prev, no: [...prev?.no, genre.id]}
        }
      }, {yes: [], no: [16, 10767, 10763, 10764]})

      return await TmdbMediaService.getSeriesByGenres(genresObj.yes, genresObj.no, sortParam, page)
    } catch (err) {
      throw err
    }
  }

  static async getMovieTrailers(id) {
    try {
      const videos = (await TmdbMediaService.getMovieVideos(id)).results;
      return videos.filter((video) => video.type === 'Trailer')
    } catch (err) {
      throw err;
    }
  }

  static async getTVTrailers(id) {
    try {
      const videos = (await TmdbMediaService.getTVVideos(id)).results;
      return videos.filter((video) => video.type === 'Trailer');
    } catch (err) {
      throw err;
    }
  }

}




