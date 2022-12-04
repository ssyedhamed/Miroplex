import axios from "axios";
import { toast } from "react-toastify";
import { apiUrl } from "../config.json";
// import { toast } from "react-toastify";
axios.interceptors.response.use(null, (error) => {
  toast("Interceptor called from genres");
  return Promise.reject(error);
});
export function getGenres() {
  const genres = axios.get(`${apiUrl}/genres`);
  return genres;
}
export function getGenre(genreId) {
  return axios.get(`${apiUrl}/genres/${genreId}`);
}
