import axios from "axios";
import { apiUrl } from "../config.json";
import { toast } from "react-toastify";
axios.interceptors.response.use(null, (error) => {
  toast("Interceptor called from movies");
  return Promise.reject(error);
});
// const apiEndpoint = "http://localhost:3001/miroplex-api/movies";
export function getMovies() {
  return axios.get(`${apiUrl}/movies`);
}
export function deleteMovie(movieId) {
  return axios.delete(`${apiUrl}/movies/${movieId}`);
}
export function getMovie(movieId) {
  return axios.get(`${apiUrl}/movies/${movieId}`);
}
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return axios.put(`${apiUrl}/movies/${movie._id}`, body);
  }
  return axios.post(`${apiUrl}/movies`, movie);
}
