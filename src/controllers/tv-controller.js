import TVService from "../services/tv-service";
import TMDBTVService from "../services/tmdb-media-service";

export default class TVController {

  static async getTVList(id_list) {
    const tvs = await Promise.allSettled(id_list.map(tv => TMDBTVService.getTVById(tv.id)));
    return tvs.reduce((prev, tv, index) => {
      if (tv.status === 'fulfilled') {
        return [...prev, {
          ...id_list[index],
          title: tv.value.name,
          year: (new Date(tv.value.first_air_date ?? Date.now())).getFullYear(),
          rating: tv.value.vote_average
        }];
      }
      return prev;
    }, []);
  };


  static async getFavourite(user_id) {
    const addedTVs = await TVService.getFavourite(user_id);
    return this.getTVList(addedTVs);
  };

  static async addFavourite(tv_id, user_id) {
    try {
      return await TVService.addFavourite(tv_id, user_id);
    } catch (err) {
      throw err;
    }
  }

  static async removeFavourite(tv_id, user_id) {
    try {
      return await TVService.removeFavourite(tv_id, user_id);
    } catch (err) {
      throw err;
    }
  }

  static async getLater(user_id) {
    const addedTVs = await TVService.getLater(user_id);
    return this.getTVList(addedTVs);
  }

  static async addLater(tv_id, user_id) {
    try {
      return await TVService.addLater(tv_id, user_id);
    } catch (err) {
      throw err;
    }
  }

  static async removeLater(tv_id, user_id) {
    try {
      return await TVService.removeLater(tv_id, user_id);
    } catch (err) {
      throw err;
    }
  }

  static async getRated(user_id) {
    const addedTVs = await TVService.getRated(user_id);
    return this.getTVList(addedTVs);
  }

  static async addRated(tv_id, rating, user_id, title) {
    try {
      return await TVService.addRated(tv_id, rating, user_id, title);
    } catch (err) {
      throw err;
    }
  }

  static async removeRated(tv_id, user_id) {
    try {
      return await TVService.removeRated(tv_id, user_id);
    } catch (err) {
      throw err;
    }
  }

  static async getUserTVInfo(tv_id, user_id) {
    try {
      return await TVService.getUserTVInfo(tv_id, user_id);
    } catch (err) {
      throw err;
    }
  }

}