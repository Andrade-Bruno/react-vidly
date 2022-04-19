import React, { Component } from "react";
import { Link } from "react-router-dom";

import Table from "../commom/table";
import Favorite from "./favorite";

class MoviesTable extends Component {
	columns = [
		{
			path: "title",
			content: (movie) => (
				<Link to={`/movies/${movie._id}`}>{movie.title}</Link>
			),
		},
		{ path: "genre.name", label: "Genre" },
		{ path: "numberInStock", label: "Stock" },
		{ path: "dailyRentalRate", label: "Rate" },
		{
			key: "favorite",
			content: (movie) => (
				<Favorite
					favorite={movie.favorite}
					onClick={() => this.props.onFavorite(movie)}
				/>
			),
		},
		{
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
		const { data, onSort, sortColumn } = this.props;

		return (
			<Table
				columns={this.columns}
				data={data}
				sortColumn={sortColumn}
				onSort={onSort}
			/>
		);
	}
}

export default MoviesTable;
