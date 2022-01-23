import AuthService from "../services/auth-service";
import store from "../store";

export default class AuthController {
  static async login(email, password) {
    store.dispatch({type: 'CHANGE_LOADING', payload: true});
    try {
      const data = await AuthService.login(email, password);
      localStorage.setItem('token', data.accessToken);
      store.dispatch({type: 'CHANGE_AUTH', payload: true})
      store.dispatch({type: 'CHANGE_USER', payload: data.user})
      return data.user;
    } catch (err) {
      throw err;
    } finally {
      store.dispatch({type: 'CHANGE_LOADING', payload: false});
    }
  }

  static async registration(email, password) {
    store.dispatch({type: 'CHANGE_LOADING', payload: true});
    try {
      const data = await AuthService.registration(email, password);
      localStorage.setItem('token', data.accessToken);
      store.dispatch({type: 'CHANGE_AUTH', payload: true})
      store.dispatch({type: 'CHANGE_USER', payload: data.user})
      return data.user;
    } catch (err) {
      throw err;
    } finally {
      store.dispatch({type: 'CHANGE_LOADING', payload: false});
    }
  }

  static async logout() {
    store.dispatch({type: 'CHANGE_LOADING', payload: true});
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      store.dispatch({type: 'CHANGE_AUTH', payload: false})
      store.dispatch({type: 'CHANGE_USER', payload: {}})
    } catch (err) {
      throw err;
    } finally {
      store.dispatch({type: 'CHANGE_LOADING', payload: false});
    }
  }

  static async checkAuth() {
    store.dispatch({type: 'CHANGE_LOADING', payload: true});
    try {
      const data = await AuthService.checkAuth();
      localStorage.setItem('token', data.accessToken);
      store.dispatch({type: 'CHANGE_AUTH', payload: true})
      store.dispatch({type: 'CHANGE_USER', payload: data.user})
    } catch (err) {
    } finally {
      store.dispatch({type: 'CHANGE_LOADING', payload: false});
    }
  }
}
