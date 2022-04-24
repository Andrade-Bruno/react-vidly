import React, { Component } from "react";
import { Link } from "react-router-dom";

import _ from "lodash";
import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";

import { getMovies } from "../../services/fakeMovieService";
import { getGenres } from "../../services/fakeGenreService";

import DropdownFilter from "../commom/dropdownFilter";
import Table from "../commom/table";
import Favorite from "./favorite";
import NavBar from "./../commom/navbar";
import SearchBar from "./../commom/searchBar";

class Movies extends Component {
	state = {
		data: [],
		filter: [],
		currentPage: 1,
		pageSize: 5,
		searchQuery: "",
		selectedFilter: null,
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

		this.setState({ data: getMovies(), filter: allGenres });
	}

	render() {
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedFilter,
			filter,
			searchQuery,
		} = this.state;

		const { totalCount, data } = this.getPageData("genre", "_id");

		return (
			<React.Fragment>
				<NavBar />
				<div className='container-bordered'>
					<h1>Movies </h1>
					<h5>Search, create, delete and favorite movies</h5>

					<hr></hr>
					<div className='table-container'>
						<div className='table-filters'>
							<DropdownFilter
								items={filter}
								selectedFilter={selectedFilter}
								onItemSelect={this.handleFilter}
								filterTitle={"Genres"}
							/>
							<SearchBar
								type='text'
								label='Title'
								name='query'
								value={searchQuery}
								className='form-control my-3'
								onChange={(e) => this.handleSearch(e.currentTarget.value)}
							/>
						</div>
						<div className='table-paginated'>
							<Table
								columns={this.columns}
								data={data}
								totalCount={totalCount}
								sortColumn={sortColumn}
								onSort={this.handleSort}
							/>
							<div className='table-paginated-options'>
								<Link to='/movies/new/' className='btn btn-secondary'>
									New Movie
								</Link>
								<Pagination
									itemsCounter={totalCount}
									pageSize={pageSize}
									currentPage={currentPage}
									onPageChange={this.handlePageChange}
								/>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	getPageData(column, columnParam) {
		const {
			pageSize,
			currentPage,
			sortColumn,
			selectedFilter,
			searchQuery,
			data: allData,
		} = this.state;

		let finalFilter = allData;
		if (searchQuery) {
			finalFilter = allData.filter((item) =>
				item.title.toLowerCase().startsWith(searchQuery.toLowerCase())
			);
		} else if (selectedFilter && selectedFilter[columnParam]) {
			finalFilter = allData.filter(
				(item) => item[column][columnParam] === selectedFilter[columnParam]
			);
		}

		// _.orderBy(data, columns to filter (can be multiple), order to filter (can be multiple))
		const finalSort = _.orderBy(
			finalFilter,
			[sortColumn.path],
			[sortColumn.order]
		);

		const data = paginate(finalSort, currentPage, pageSize);

		return { totalCount: finalFilter.length, data };
	}

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleFilter = (itemFilter) => {
		this.setState({
			currentPage: 1,
			selectedFilter: itemFilter,
			searchQuery: "",
		});
	};

	handleSort = (sortColumn) => {
		this.setState({ currentPage: 1, sortColumn: sortColumn });
	};

	handleSearch = (query) => {
		this.setState({ currentPage: 1, selectedFilter: null, searchQuery: query });
	};

	handleFavorite = (movie) => {
		const newData = [...this.state.data];
		const index = newData.indexOf(movie);
		newData[index] = { ...movie };
		newData[index].favorite = !newData[index].favorite;
		this.setState({ data: newData });
	};

	handleDelete = (movie) => {
		const newData = this.state.data.filter((m) => m._id !== movie._id);
		this.setState({ data: newData });
	};
}

export default Movies;
