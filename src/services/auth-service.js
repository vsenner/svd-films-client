import $api from "../API/api";
import axios from "axios";

export default class AuthService {
  static async login(email, password) {
    return (await $api.post('/login', {email, password})).data;
  }

  static async registration(email, password) {
    return (await $api.post('/registration', {email, password})).data;
  }

  static async logout() {
    return (await $api.post('/logout')).data;
  }

  static async checkAuth() {
    const API_URL = 'http://localhost:5000/api'
    return (await axios.get(`${API_URL}/refresh`, {withCredentials: true})).data;
  }

}