import MovieController from "../../controllers/movie-controller";
import TVController from "../../controllers/tv-controller";

const MOVIE = 'movie';
const TV = 'tv';
const FAVORITE = 'favorite';
const RATED = 'rated';
const LATER = 'later';

export const getMediaList = async (user_id, media_type, type) => {

  switch (media_type) {
    case MOVIE: return await fetchMovieList(type,user_id);

    case TV: return await fetchTVList(type, user_id);

    default: throw Error('Incorrect media type');
  }
};

const fetchMovieList = async (type, user_id) => {
  switch (type) {
    case FAVORITE: return await MovieController.getFavourite(user_id);

    case LATER: return await MovieController.getLater(user_id);

    case RATED: return await MovieController.getRated(user_id);

    default: throw Error('Incorrect Movie choice type');
  }
}

const fetchTVList = async (type, user_id) => {
  switch (type) {
    case FAVORITE: return await TVController.getFavourite(user_id);

    case LATER: return await TVController.getLater(user_id);

    case RATED: return await TVController.getRated(user_id);

    default: throw Error('Incorrect TV choice type');
  }
}