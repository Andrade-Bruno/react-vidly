import React, { Component } from "react";
import _ from "lodash";

import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";
import { getRates } from "../../services/fakeRateService";

import DefaultFilter from "../commom/defaultFilter";
import MoviesTable from "./moviesTable";

import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		rates: [],
		currentPage: 1,
		pageSize: 5,
		sortColumn: { path: "title", order: "asc" },
	};

	componentDidMount() {
		const allGenres = [{ _id: "", name: "All" }, ...getGenres()];
		const allRates = [{ _id: "", name: "All" }, ...getRates()];

		this.setState({ movies: getMovies(), genres: allGenres, rates: allRates });
	}

	render() {
		const { pageSize, currentPage, sortColumn } = this.state;

		const { totalCount, data: movies } = this.getPageData();
		return (
			<React.Fragment>
				<div className='container-bordered'>
					<h1>Movies</h1>
					<h5>Search some movies, delete or favorite it!</h5>
					<hr></hr>
					<div className='table-container'>
						<div className='table-filters'>
							<p>Filters</p>
							<DefaultFilter
								items={this.state.genres}
								selectedFilter={this.state.selectedFilter}
								onItemSelect={this.handleFilter}
								filterTitle={"Genres"}
							/>
							{/* <br></br>
							<DefaultFilter
								items={this.state.rates}
								selectedFilter={this.state.selectedFilter}
								onItemSelect={this.handleFilter}
								filterTitle={"Rates"}
							/> */}
						</div>
						<div className='table-paginated'>
							<MoviesTable
								data={movies}
								sortColumn={sortColumn}
								totalCount={totalCount}
								onFavorite={this.handleFavorite}
								onDelete={this.handleDelete}
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

	handleSort = (sortColumn) => {
		this.setState({ sortColumn: sortColumn });
	};
}

export default Movies;
