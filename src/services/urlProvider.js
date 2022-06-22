import http from "./httpService";
import cfg from "../../src/cfg.json";

export function getGenres() {
	return http.get(cfg.api + "genres/");
}

export function getMovies() {
	return http.get(cfg.api + "movies/");
}

export function deleteMovie(movieId) {
	return http.delete(cfg.api + "movies/" + movieId);
}

export function getMovie(movieId) {
	return http.get(cfg.api + "movies/" + movieId);
}

export function saveMovie(movie) {
	if (movie._id) {
		const m = { ...movie };
		delete m._id;
		return http.put(cfg.api + "movies/" + movie._id, m);
	}

	return http.post(cfg.api + "movies/", movie);
}

export default {
	getGenres,
	getMovies,
	deleteMovie,
	getMovie,
	saveMovie,
};
