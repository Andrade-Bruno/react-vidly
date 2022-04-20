import React, { Component } from "react";

class TableHeader extends Component {
	render() {
		return (
			<thead>
				<tr>
					{this.props.columns.map((column) => (
						<th
							width={column.width}
							className='clickable'
							key={column.path || column.key}
							onClick={() => this.raiseSort(column.path)}>
							{column.label} {this.renderSortIcon(column)}
						</th>
					))}
				</tr>
				{/* key={c.path || c.key} */}
				{/* key=We should use unique keys for each item */}
				{/* If the item doesn't have a name, we can pass an object with the key property and use it */}
			</thead>
		);
	}

	raiseSort = (path) => {
		const sortColumn = { ...this.props.sortColumn };
		if (sortColumn.path === path)
			sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
		else {
			sortColumn.path = path;
			sortColumn.order = "asc";
		}
		this.props.onSort(sortColumn);
	};

	renderSortIcon = (column) => {
		const { sortColumn } = this.props;

		if (column.path !== sortColumn.path) return null;
		if (sortColumn.order === "asc") return <i className='fa fa-sort-asc'></i>;
		return <i className='fa fa-sort-desc'></i>;
	};
}

export default TableHeader;
