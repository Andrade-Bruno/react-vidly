import http from "./httpService";
import config from '../../src/config.json'

export function getGenres() {
    return http.get(config.apiUrl + "genres/")
}

export function getMovies() {
    return http.get(config.apiUrl + "movies/")
}

export function deleteMovie(movieId) {
    return http.delete(config.apiUrl + "movies/" + movieId)
}

export function getMovie(movieId) {
    return http.get(config.apiUrl + "movies/" +  movieId);
}

export function saveMovie(movie) {
    if (movie._id) {
        const m = {...movie}
        delete m._id
        return http.put(config.apiUrl + 'movies/' + movie._id, m)
    }

    return http.post(config.apiUrl + 'movies/', movie)
}