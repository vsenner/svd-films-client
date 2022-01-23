import $api from "../API/api";
import axios from "axios";

const BASE_PATH = '/unauthorized/user';

export default class AuthService {
  static async login(email, password) {
    return (await $api.post(`${BASE_PATH}/login`, {email, password})).data;
  }

  static async registration(email, password) {
    return (await $api.post(`${BASE_PATH}/registration`, {email, password})).data;
  }

  static async logout() {
    return (await $api.post(`${BASE_PATH}/logout`)).data;
  }

  static async refresh() {
    return (await axios.get(`${process.env.REACT_APP_SERVER_URL}/${BASE_PATH}/refresh`, {withCredentials: true})).data;
  }

}