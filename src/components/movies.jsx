import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";

class Movies extends Component {
	state = {
		movies: getMovies(),
	};

	render() {
		return (
			<React.Fragment>
				<h1>Vidly</h1>
				<div>{this.renderTotalMovies()}</div>
				<table className='table'>
					<thead>
						<tr>
							<th className='col'>Title</th>
							<th className='col'>Genre</th>
							<th className='col'>Stock</th>
							<th className='col'>Rate</th>
							<th className='col'>Favorite</th>
							<th className='col'></th>
						</tr>
					</thead>
					<tbody>{this.renderMovies()}</tbody>
				</table>
			</React.Fragment>
		);
	}

	renderMovies() {
		return this.state.movies.map((movie) => (
			<tr key={movie._id}>
				<td>{movie.title}</td>
				<td>{movie.genre.name}</td>
				<td>{movie.numberInStock}</td>
				<td>{movie.dailyRentalRate}</td>
				<td onClick={() => this.handleFavorite(movie)}>
					<i className={movie.className} aria-hidden='true'></i>
				</td>
				<td>
					<button
						className='btn btn-danger btn-sm'
						onClick={() => this.handleDelete(movie)}>
						Delete
					</button>
				</td>
			</tr>
		));
	}

	renderTotalMovies() {
		const moviesAmount = this.state.movies.length;
		let message;
		if (moviesAmount > 0) {
			message = `There are ${moviesAmount} movie(s) available in database.`;
		} else {
			message = `There are no movies available.`;
		}
		return <h5>{message}</h5>;
	}

	handleDelete = (movie) => {
		const newListMovies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies: newListMovies });
	};

	handleFavorite = (m) => {
		let newClassName;
		const newMovies = [...this.state.movies];
		const index = newMovies.indexOf(m);
		newMovies[index] = { ...m };
		if (newMovies[index].className === "fa fa-heart-o") {
			newClassName = "fa fa-heart";
		} else {
			newClassName = "fa fa-heart-o";
		}
		newMovies[index].className = newClassName;
		this.setState({ movies: newMovies });
		console.log(newMovies);
	};
}

export default Movies;
