import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";
import provider from "../../services/urlProvider";
import DropdownFilter from "../commom/dropdownFilter";
import Table from "../commom/table";
import Favorite from "./favorite";
import SearchBar from "./../commom/searchBar";
import fn from "./../../utils/functions";

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
			width: "5%",
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

	async componentDidMount() {
		const { data: genres } = await provider.getGenres();
		const allGenres = [{ _id: "", name: "All" }, ...genres];

		const { data: movies } = await provider.getMovies();

		this.setState({ data: movies, filter: allGenres });
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
		const { user } = this.props;

		const { totalCount, data } = this.getPageData("genre", "_id");

		return (
			<React.Fragment>
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
								{user && (
									<Link to='/movies/new/' className='btn btn-secondary'>
										New Movie
									</Link>
								)}
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
		if (newData[index].favorite === true) {
			toast.info(`"${movie.title}" unfavorited.`);
		} else {
			toast.success(`"${movie.title}" favorited.`);
		}
		newData[index].favorite = !newData[index].favorite;
		this.setState({ data: newData });
	};

	handleDelete = async (movie) => {
		const originalData = this.state.data;

		const newData = originalData.filter((m) => m._id !== movie._id);
		this.setState({ data: newData });

		try {
			await provider.deleteMovie(movie._id);
			toast.success(`"${movie.title}" deleted successfully.`);
		} catch (ex) {
			fn.handleBadRequest(ex);
			if (ex.response && ex.response.status === 404)
				toast.error("This movie has already been deleted.");

			this.setState({ data: originalData });
		}
	};
}

export default Movies;
