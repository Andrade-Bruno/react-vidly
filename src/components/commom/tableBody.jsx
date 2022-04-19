import React, { Component } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

class TableBody extends Component {
	render() {
		const { data, columns, linkHref } = this.props;

		return (
			<tbody>
				{data.map((data) => (
					<tr key={data._id}>
						{columns.map((column) => (
							<td key={this.createKey(data, column)}>
								{this.renderCell(data, column, linkHref)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		);
	}

	renderCell = (data, column, linkHref) => {
		const queryStringHref = linkHref + data._id;

		if (column.content) {
			return column.content(data);
		} else {
			return column.path === "title" ? (
				<Link to={queryStringHref}>{_.get(data, column.path)}</Link>
			) : (
				_.get(data, column.path)
			);
		}
	};

	createKey = (i, c) => {
		return i._id + (c.path || c.key);
	};
}

export default TableBody;
