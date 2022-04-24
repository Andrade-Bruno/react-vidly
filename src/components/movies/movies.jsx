import React, { Component } from "react";
import { Link } from "react-router-dom";

import _ from "lodash";
import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";

import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import { getRates } from "../../services/fakeRateService";

import DefaultFilter from "../commom/defaultFilter";
import Table from "../commom/table";
import Favorite from "./favorite";
import NavBar from "./../commom/navbar";

class Movies extends Component {
	state = {
		movies: [],
		filter: [],
		rates: [],
		currentPage: 1,
		pageSize: 5,
		sortColumn: { path: "title", order: "asc" },
	};

	columns = [
		{
			width: "25%",
			path: "title",
			label: "Title",
			content: (movie) => (
				<Link to={`/movies/${movie._id}`}>{movie.title}</Link>
			),
		},
		{ width: "20%", path: "genre.name", label: "Genre" },
		{ width: "20%", path: "numberInStock", label: "Stock" },
		{ width: "20%", path: "dailyRentalRate", label: "Rate" },
		{
			width: "5%",
			key: "favorite",
			content: (movie) => (
				<Favorite
					favorite={movie.favorite}
					onClick={() => this.handleFavorite(movie)}
				/>
			),
		},
		{
			width: "10%",
			key: "delete",
			content: (movie) => (
				<button
					className='btn btn-danger btn-sm'
					onClick={() => this.handleDelete(movie)}>
					Delete
				</button>
			),
		},
	];

	componentDidMount() {
		const allGenres = [{ _id: "", name: "All" }, ...getGenres()];
		const allRates = [{ _id: "", name: "All" }, ...getRates()];

		this.setState({ movies: getMovies(), filter: allGenres, rates: allRates });
	}

	render() {
		const { pageSize, currentPage, sortColumn, selectedFilter, filter } =
			this.state;

		const { totalCount, data } = this.getPageData();

		return (
			<React.Fragment>
				<NavBar />
				<div className='container-bordered'>
					<h1>Movies</h1>
					<h5>Search for our movies, delete or favorite it</h5>

					<hr></hr>
					<div className='table-container'>
						<div className='table-filters'>
							<h5>Filters</h5>
							<DefaultFilter
								items={filter}
								selectedFilter={selectedFilter}
								onItemSelect={this.handleFilter}
								filterTitle={"Genres"}
							/>
							<h5>Actions</h5>
							<Link to='/movies/new/' className='btn btn-success'>
								New Movie
							</Link>
						</div>
						<div className='table-paginated'>
							<Table
								columns={this.columns}
								data={data}
								totalCount={totalCount}
								sortColumn={sortColumn}
								onSort={this.handleSort}
							/>
							<Pagination
								itemsCounter={totalCount}
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

	getPageData() {
		const {
			pageSize,
			currentPage,
			movies: allMovies,
			selectedFilter,
			sortColumn,
		} = this.state;

		const finalFilter =
			selectedFilter && selectedFilter._id
				? allMovies.filter((m) => m.genre._id === selectedFilter._id)
				: allMovies;

		// _.orderBy(data, columns to filter (can be multiple), order to filter (can be multiple))
		const finalSort = _.orderBy(
			finalFilter,
			[sortColumn.path],
			[sortColumn.order]
		);

		const movies = paginate(finalSort, currentPage, pageSize);

		return { totalCount: finalFilter.length, data: movies };
	}

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleFilter = (itemFilter) => {
		this.setState({ currentPage: 1, selectedFilter: itemFilter });
	};

	handleSort = (sortColumn) => {
		this.setState({ currentPage: 1, sortColumn: sortColumn });
	};

	handleFavorite = (movie) => {
		const newMovies = [...this.state.movies];
		const index = newMovies.indexOf(movie);
		newMovies[index] = { ...movie };
		newMovies[index].favorite = !newMovies[index].favorite;
		this.setState({ movies: newMovies });
	};

	handleDelete = (movie) => {
		const newListMovies = this.state.movies.filter((m) => m._id !== movie._id);
		this.setState({ movies: newListMovies });
	};
}

export default Movies;
