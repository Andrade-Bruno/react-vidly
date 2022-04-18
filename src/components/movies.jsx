import React, { Component } from "react";

import Pagination from "../utils/pagination";
import { paginate } from "../utils/paginate";
import { getMovies } from "../services/fakeMovieService";
import { genres, getGenres } from "../services/fakeGenreService";
import Favorite from "./commom/favorite";
import DefaultFilter from "./commom/defaultFilter";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		currentPage: 1,
		pageSize: 4,
	};

	componentDidMount() {
		const allGenres = [{ name: "All genres" }, ...getGenres()];

		this.setState({ movies: getMovies(), genres: allGenres });
	}

	render() {
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			selectedFilter,
		} = this.state;

		const finalFilter =
			selectedFilter && selectedFilter._id
				? allMovies.filter((m) => m.genre._id === selectedFilter._id)
				: allMovies;

		const movies = paginate(finalFilter, currentPage, pageSize);

		return (
			<React.Fragment>
				<div className='container'>
					<h1>Vidly</h1>
					<div>
						<h5>
							There are {finalFilter.length} {finalFilter.name} movie(s)
							available.
						</h5>
					</div>
					<hr></hr>
					{/* Filter and Table */}
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "flex-start",
							justifyContent: "space-between",
							gap: "10px",
							// background: "seagreen",
							width: "80%",
							height: "500px",
						}}>
						{/* Filter */}
						<div>
							<DefaultFilter
								items={this.state.genres}
								selectedFilter={this.state.selectedFilter}
								onItemSelect={this.handleFilter}
							/>
						</div>
						{/* Table */}
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-end",
								justifyContent: "space-between",
								height: "100%",
							}}>
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
								<tbody>
									{movies.map((movie) => (
										<tr key={movie._id}>
											<td>{movie.title}</td>
											<td>{movie.genre.name}</td>
											<td>{movie.numberInStock}</td>
											<td>{movie.dailyRentalRate}</td>
											<td>
												<Favorite
													favorite={movie.favorite}
													onClick={() => this.handleFavorite(movie)}
												/>
											</td>
											{/* <td onClick={() => this.handleFavorite(movie)}>
									<i className={movie.className} aria-hidden='true'></i>
								</td> */}
											<td>
												<button
													className='btn btn-danger btn-sm'
													onClick={() => this.handleDelete(movie)}>
													Delete
												</button>
											</td>
										</tr>
									))}
								</tbody>
							</table>
							<Pagination
								itemsCounter={finalFilter.length}
								pageSize={pageSize}
								currentPage={currentPage}
								onPageChange={this.handlePageChange}
							/>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	handleDelete = (movie) => {
		const newListMovies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies: newListMovies });
	};

	handleFavorite = (movie) => {
		const newMovies = [...this.state.movies];
		const index = newMovies.indexOf(movie);
		newMovies[index] = { ...movie };
		newMovies[index].favorite = !newMovies[index].favorite;
		this.setState({ movies: newMovies });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleFilter = (itemFilter) => {
		this.setState({ currentPage: 1, selectedFilter: itemFilter });
	};

	// handleFavorite = (m) => {
	// 	let newClassName;
	// 	const newMovies = [...this.state.movies];
	// 	const index = newMovies.indexOf(m);
	// 	newMovies[index] = { ...m };
	// 	if (newMovies[index].className === "fa fa-heart-o") {
	// 		newClassName = "fa fa-heart";
	// 	} else {
	// 		newClassName = "fa fa-heart-o";
	// 	}
	// 	newMovies[index].className = newClassName;
	// 	this.setState({ movies: newMovies });
	// };
}

export default Movies;
