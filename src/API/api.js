import axios from 'axios'

const API_URL = process.env.REACT_APP_SERVER_URL;

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
})

$api.interceptors.response.use((config) => {
  return config;
}, async (error) => {
  if (!error.response) {
    throw new Error('Server error! Please, try again later!');
  }
  if (error.response?.status === 401) {
    try {
      const originalRequest = error.config;
      const resp = await axios.get(`${API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem('token', resp.data.accessToken);
      return $api.request(originalRequest);
    } catch (err) {
      throw err.response.data.message;
    }
  }
  if (error.response?.status === 402) {
    if (error.response.data.errors.length) {
      switch (error.response.data.errors[0].param) {
        case 'email':
          // eslint-disable-next-line no-throw-literal
          throw 'Incorrect e-mail! Please, try again!';
        case 'password':
          // eslint-disable-next-line no-throw-literal
          throw 'Password should be longer than 5 characters!';
        case 'username':
          // eslint-disable-next-line no-throw-literal
          throw 'Username must be longer than 3 characters!'
        default:
      }
    }
    throw error.response.data.message
  }

})

export default $api;