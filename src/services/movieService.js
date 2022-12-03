import axios from "axios";
const apiEndpoint = "http://localhost:3001/miroplex-api/movies";
export function getMovies() {
  return axios.get(apiEndpoint);
}
export function deleteMovie(movieId) {
  return axios.delete(apiEndpoint + "/" + movieId);
}
