import AuthService from "../services/auth-service";
import store from "../store/index";

export default class AuthController {
  static async login(email, password) {
    try {
      const data = await AuthService.login(email, password);
      localStorage.setItem('token', data.accessToken);
      store.dispatch({type: 'CHANGE_USER', payload: data.user})
      return data.user;
    } catch (err) {
      throw err;
    }
  }

  static async registration(email, password) {
    try {
      const data = await AuthService.registration(email, password);
      localStorage.setItem('token', data.accessToken);
      store.dispatch({type: 'CHANGE_USER', payload: data.user})
    } catch (err) {
      throw err;
    }
  }

  static async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      store.dispatch({type: 'LOGOUT'});
    } catch (err) {
      throw err;
    }
  }

  static async refresh() {
    try {
      const data = await AuthService.refresh();
      console.log('USER-DATA - ', data);
      localStorage.setItem('token', data.accessToken);
      store.dispatch({type: 'CHANGE_USER', payload: data.user});
    } catch (err) {
      store.dispatch({type: 'CHANGE_USER', payload: {isAuth: false}});
    }
  }
}
