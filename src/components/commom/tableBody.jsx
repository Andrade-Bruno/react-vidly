import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
	render() {
		const { data, columns } = this.props;

		return (
			<tbody>
				{data.map((data) => (
					<tr key={data._id}>
						{columns.map((column) => (
							<td width={column.width} key={this.createKey(data, column)}>
								{this.renderCell(data, column)}
							</td>
						))}
					</tr>
				))}
			</tbody>
		);
	}

	renderCell = (data, column) => {
		if (column.content) return column.content(data);

		return _.get(data, column.path);
	};

	createKey = (data, column) => {
		return data._id + (column.path || column.key);
	};
}

export default TableBody;
