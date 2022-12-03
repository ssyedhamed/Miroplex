import axios from "axios";
export function getMovies() {
  return axios.get("http://localhost:3001/miroplex-api/movies");
}
export function deleteMovie(movieId) {
  return axios.delete("http://localhost:3001/miroplex-api/movies/" + movieId);
}
