import MovieController from "../controllers/movie-controller";

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

export const rateFilm = async (rating, setUserFilmInfo, film_id, user_id) => {
  try {
    await MovieController.addRated(film_id, rating, user_id);
    setUserFilmInfo(prev => ({...prev, isRated: true, rating}));
  } catch (err) {
    console.log(err);
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