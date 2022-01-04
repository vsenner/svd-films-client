import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: '0b66731e6ff005f738cc6bb2c475d2ca',
    language: localStorage.getItem('lang')
  }
})

export default instance;