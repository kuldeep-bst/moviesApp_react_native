// services/tmdb.js
import axios from 'axios';

const API_KEY = '2afea52f7abecdf34e61aa2d60458181';
const BASE_URL = 'https://api.themoviedb.org/3';

export const getMovies = async (page = 1) => {
  try {
    // console.log("running");
    const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
    return response.data.results;
  } catch (error) {
    // console.log("running");
    console.error(error);
    return [];
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    console.log(query)
    // console.log("running");
    const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    return response.data.results;
  } catch (error) {
    // console.log("running");
    console.error(error);
    return [];
  }
};
