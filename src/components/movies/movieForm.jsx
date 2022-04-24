import React from "react";
import NavBar from "../commom/navbar";
import Joi from "joi-browser";

import { getMovie, saveMovie } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";

import Form from "../commom/form";

class MovieForm extends Form {
	state = {
		data: {
			title: "",
			numberInStock: "",
			genreId: "",
			dailyRentalRate: "",
		},
		genres: [],
		errors: {},
	};

	schema = {
		_id: Joi.string(),
		title: Joi.string().required().label("Title"),
		numberInStock: Joi.number().required().label("Number in stock"),
		genreId: Joi.string().label("Genre"),
		dailyRentalRate: Joi.number().required().label("Rate"),
		// favorite: Joi.boolean(),
	};

	componentDidMount() {
		const genres = getGenres();
		this.setState({ genres });

		const movieId = this.props.match.params.id;
		if (movieId === "new") return;

		const movie = getMovie(movieId);
		if (!movie) return this.props.history.replace("/not-found/");

		this.setState({ data: this.mapToViewModel(movie) });
	}

	mapToViewModel(movie) {
		return {
			_id: movie._id,
			title: movie.title,
			genreId: movie.genre._id,
			numberInStock: movie.numberInStock,
			dailyRentalRate: movie.dailyRentalRate,
		};
	}

	render() {
		const { history } = this.props;

		return (
			<React.Fragment>
				<NavBar />
				<div className='container-bordered'>
					<h1> New Movie </h1>
					<hr></hr>
					<form onSubmit={this.handleSubmit}>
						{this.renderInput("title", "Title")}
						{this.renderSelect("genreId", "Genre", this.state.genres)}
						{this.renderInput("numberInStock", "Stock")}
						{this.renderInput("dailyRentalRate", "Rate")}
						{this.renderButtonSubmit("Save")}
					</form>
					<br></br>
					<button
						className='btn btn-primary'
						onClick={() => history.push("/movies/")}>
						Back
					</button>
				</div>
			</React.Fragment>
		);
	}

	doSubmit = () => {
		saveMovie(this.state.data);
		this.props.history.push("/movies/");
	};
}

export default MovieForm;
