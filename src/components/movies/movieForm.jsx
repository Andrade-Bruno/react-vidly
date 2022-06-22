import React from "react";
import Joi from "joi-browser";
import provider from "../../services/urlProvider";
import fn from "./../../utils/functions";
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
		title: Joi.string().required().label("Title").min(5),
		numberInStock: Joi.number().required().label("Number in stock"),
		genreId: Joi.string().label("Genre"),
		dailyRentalRate: Joi.number().required().label("Rate"),
	};

	async componentDidMount() {
		await this.populateGenres();
		await this.populateMovies();
	}

	async populateGenres() {
		const { data: genres } = await provider.getGenres();
		this.setState({ genres });
	}

	async populateMovies() {
		try {
			const movieId = this.props.match.params.id;
			if (movieId === "new") return;

			const { data: movie } = await provider.getMovie(movieId);
			this.setState({ data: this.mapToViewModel(movie) });
		} catch (ex) {
			if (ex.response && ex.response.status === 404)
				this.props.history.replace("/not-found/");
		}
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

	doSubmit = async () => {
		try {
			await provider.saveMovie(this.state.data);
			this.props.history.push("/movies/");
		} catch (ex) {
			fn.handleBadRequest(ex);
		}
	};
}

export default MovieForm;
