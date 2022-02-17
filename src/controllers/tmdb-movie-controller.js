import TMDBMovieService from "../services/tmdb-movie-service";

export default class TMDBMovieController {
  static async getPopular() {
    try {
      return await TMDBMovieService.getPopular()
    } catch (err) {
      throw err;
    }
  }

  static async getMovieById(id) {
    try {
      return await TMDBMovieService.getMovieById(id)
    } catch (err) {
      throw err;
    }
  }

  static async getAllMoviesGenres() {
    try {
      const bannedGenreIds = [16]
      return TMDBMovieService.getAllMovieGenres().then((data)=>{
        return data.genres.filter(genreIt=>!bannedGenreIds.includes(genreIt.id))
      })
    } catch (err) {
      throw err;
    }
  }

  static async getTVById(id) {
    try {
      return await TMDBMovieService.getTVById(id)
    } catch (err) {
      throw err;
    }
  }

  static async getAllGenres() {
    try {
      return (await TMDBMovieService.getAllGenres())
    } catch (err) {
      throw err;
    }
  }

  static async getAllSeriesGenres() {
    try {
      const bannedGenreIds = [16, 10767, 10763, 10764]
      return TMDBMovieService.getAllSeriesGenres().then((data)=>{
        return data.genres.filter(genreIt=>!bannedGenreIds.includes(genreIt.id))
      })
    } catch (err) {
      throw err;
    }
  }

  static async getAllCartoonGenres(){
    try{
      const bannedGenreIds = [16]
      return TMDBMovieService.getAllMovieGenres().then((data)=>{
        return data.genres.filter(genreIt=>!bannedGenreIds.includes(genreIt.id))
      })
    }catch(err){
      throw err;
    }
  }

  static async search(query) {
    try {
      return TMDBMovieService.search(query).then(response => {
        return response.results.filter(elem => elem.media_type === 'movie' || elem.media_type === 'tv')
            .sort((a, b) => {
              return a.popularity - b.popularity
            })
            .reverse()
            .slice(0, 4)
      })
    } catch (err) {
      throw err
    }
  }

  static async getMovieActorsById(id) {
    try {
      return (await TMDBMovieService.getMovieCreditsById(id)).cast
    } catch (err) {
      throw err;
    }
  }

  static async getActorsById(id) {
    try {
      return (await TMDBMovieService.getCreditsById(id)).cast
    } catch (err) {
      throw err;
    }
  }

  static async getMovieDirectorById(id) {
    try {
      return TMDBMovieService.getMovieCreditsById(id).then(resp => {
        return resp.crew.find(obj => obj.job === 'Director');
      })
    } catch (err) {
      throw err;
    }
  }

  static async getTVActorsById(id) {
    try {
      return (await TMDBMovieService.getTVCreditsById(id)).cast
    } catch (err) {
      throw err;
    }
  }
  static async getTVDirectorById(id) {
    try {
      return TMDBMovieService.getTVCreditsById(id).then(resp => {
        return resp.crew.filter(obj => obj.jobs.find(job => job.job === 'Director'));
      })
    } catch (err) {
      throw err;
    }
  }


  static async getTVSeries() {
    try {
      const TVs = (await TMDBMovieService.getTVs()).results;
      return TVs.filter(TV => TV.genre_ids.findIndex(id => id === (10764 || 10763 || 10767)) === -1)
    } catch (err) {
      throw err
    }
  }

  static async getTVShows(){
    try{
      const TVs = (await TMDBMovieService.getTVs()).results;
      return TVs.filter(TV => TV.genre_ids.findIndex(id => id === (10764 || 10763 || 10767)) !== -1)
    } catch(err){
      throw err
    }
  }

  static async getCartoons(){
    try{
      const cartoons = (await TMDBMovieService.getPopular()).results;
      return cartoons.filter(cartoon => (cartoon.genre_ids.findIndex(id => id === 16)) !== -1)

    } catch (err) {
      throw err
    }
  }

  static async getMoviesWithGenres(genres, sortParam,page){
    try{
      const genresObj = genres.reduce((prev, genre)=> {
        if(genre.select){
          return {...prev, yes: [...prev?.yes, genre.id]}
        }else{
          return {...prev, no: [...prev?.no, genre.id]}
        }
      }, {yes:[], no:[]})

      return await TMDBMovieService.getMoviesByGenres(genresObj.yes, genresObj.no, sortParam,page)
    } catch (err) {
      throw err
    }
  }

  static async getSeriesWithGenres(genres, sortParam,page){
    try{
      const genresObj = genres.reduce((prev, genre)=> {
        if(genre.select){
          return {...prev, yes: [...prev?.yes, genre.id]}
        }else{
          return {...prev, no: [...prev?.no, genre.id]}
        }
      }, {yes:[], no:[16, 10767, 10763, 10764]})

      return await TMDBMovieService.getSeriesByGenres(genresObj.yes, genresObj.no, sortParam,page)
    } catch (err) {
      throw err
    }
  }

}




