import React from "react";

import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = (props) => {
	const { data, columns, sortColumn, onSort } = props;

	return (
		<table className='table'>
			<TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
			<TableBody columns={columns} data={data} />
		</table>
	);
};

export default Table;
