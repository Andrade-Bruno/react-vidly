import React, { Component } from "react";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component {
	render() {
		const { data, columns, sortColumn, onSort, totalCount } = this.props;
		return (
			<table className='table table-hover table-borderless'>
				<caption>{this.handleTotalCount(totalCount)}</caption>
				<TableHeader
					columns={columns}
					sortColumn={sortColumn}
					onSort={onSort}
				/>
				<TableBody columns={columns} data={data} />
			</table>
		);
	}

	handleTotalCount(totalCount) {
		let message = `Showing ${totalCount} `;
		if (totalCount === 1) {
			message += "result.";
		} else if (totalCount <= 0) {
			message = "There's no data available based on your search.";
		} else if (totalCount > 1) {
			message += "results.";
		}
		return message;
	}
}

export default Table;
