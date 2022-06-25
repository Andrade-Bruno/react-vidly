import React, { Component } from "react";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

class Table extends Component {
	render() {
		const { data, columns, sortColumn, onSort, totalCount } = this.props;
		return (
			<table className='table table-hover table-striped table-borderless'>
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
		let message;
		if (totalCount === 1) {
			message = "Showing 1 result.";
		} else if (totalCount > 1) {
			message = `Showing ${totalCount} results.`;
		}
		return message;
	}
}

export default Table;
