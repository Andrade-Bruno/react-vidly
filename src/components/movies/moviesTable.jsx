import React, { Component } from "react";
import { Link } from "react-router-dom";

import Table from "../commom/table";
import Favorite from "./favorite";

class MoviesTable extends Component {
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
					onClick={() => this.props.onFavorite(movie)}
				/>
			),
		},
		{
			width: "10%",
			key: "delete",
			content: (movie) => (
				<button
					className='btn btn-danger btn-sm'
					onClick={() => this.props.onDelete(movie)}>
					Delete
				</button>
			),
		},
	];

	render() {
		const { data, onSort, sortColumn, totalCount } = this.props;

		return (
			<Table
				columns={this.columns}
				data={data}
				sortColumn={sortColumn}
				onSort={onSort}
				totalCount={totalCount}
			/>
		);
	}
}

export default MoviesTable;
