import MovieController from "../controllers/movie-controller";
import TVController from "../controllers/tv-controller";

export const addFavourite = async (setUserFilmInfo, film_id, user_id) => {
  try {
    await MovieController.addFavourite(film_id, user_id);
    setUserFilmInfo(prev => ({...prev, isFavourite: true}));
  } catch (err) {
    console.log(err);
  }
}

export const removeFavourite = async (setUserFilmInfo, film_id, user_id) => {
  try {
    await MovieController.removeFavourite(film_id, user_id);
    setUserFilmInfo(prev => ({...prev, isFavourite: false}));
  } catch (err) {
    console.log(err);
  }
}

export const addLater = async (setUserFilmInfo, film_id, user_id) => {
  try {
    await MovieController.addLater(film_id, user_id);
    setUserFilmInfo(prev => ({...prev, isLater: true}));
  } catch (err) {
    console.log(err);
  }
}

export const removeLater = async (setUserFilmInfo, film_id, user_id) => {
  try {
    await MovieController.removeLater(film_id, user_id);
    setUserFilmInfo(prev => ({...prev, isLater: false}));
  } catch (err) {
    console.log(err);
  }
}

export const rateFilm = async (rating, setUserMediaInfo, media_id, user_id, content_type, title) => {

  try {
    switch (content_type) {
      case 'movie': {
        await MovieController.addRated(media_id, rating, user_id);
        break;
      }
      case 'tv': {
        console.log('THEREEEE')
        await TVController.addRated(media_id, rating, user_id, title)
        break;
      }
      default: return Error('Error Rating Media TYPE');
    }

    setUserMediaInfo(prev => ({...prev, isRated: true, rating}));
  } catch (err) {
    throw Error('Error Rating Media FETCH/SET');
  }
}

export const unRateFilm = async (setUserFilmInfo, film_id, user_id) => {
  try {
    await MovieController.removeRated(film_id, user_id);
    setUserFilmInfo(prev => ({...prev, isRated: false, rating: null}));
  } catch (err) {
    console.log(err);
  }
}