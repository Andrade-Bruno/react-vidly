import http from "./httpService";

export function getGenres() {
	return http.get("genres/");
}

export function getMovies() {
	return http.get("movies/");
}

export function deleteMovie(movieId) {
	return http.delete("movies/" + movieId);
}

export function getMovie(movieId) {
	return http.get("movies/" + movieId);
}

export function saveMovie(movie) {
	if (movie._id) {
		const m = { ...movie };
		delete m._id;
		return http.put("movies/" + movie._id, m);
	}

	return http.post("movies/", movie);
}

export default {
	getGenres,
	getMovies,
	deleteMovie,
	getMovie,
	saveMovie,
};
