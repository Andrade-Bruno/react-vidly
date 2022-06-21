import React, { Component } from "react";
import { Link } from "react-router-dom";

import _ from "lodash";
import { paginate } from "../../utils/paginate";
import Pagination from "../../utils/pagination";

import { getCustomers } from "../../services/development/fakeCustomerService";
import { getCities } from "../../services/development/fakeCityServices";

import DropdownFilter from "../commom/dropdownFilter";
import Table from "../commom/table";

class Customers extends Component {
	state = {
		customers: [],
		filter: [],
		currentPage: 1,
		pageSize: 5,
		sortColumn: { path: "firstName", order: "asc" },
	};

	columns = [
		{
			width: "15%",
			path: "firstName",
			label: "Name",
			content: (customer) => (
				<Link to={`/customers/${customer._id}`}>
					{customer.firstName} {customer.lastName}
				</Link>
			),
		},
		{ width: "10%", path: "age", label: "Age" },
		{ width: "30%", path: "address", label: "Address" },
		{ width: "15%", path: "city.name", label: "City" },
		{ width: "15%", path: "phone", label: "Phone" },
	];

	componentDidMount() {
		const allCities = [{ _id: "", name: "All" }, ...getCities()];

		this.setState({ customers: getCustomers(), filter: allCities });
	}

	render() {
		const { pageSize, currentPage, sortColumn, selectedFilter, filter } =
			this.state;
		const { totalCount, data } = this.getPageData();

		return (
			<React.Fragment>
				<div className='container-bordered'>
					<h1>Customers</h1>
					<h5>Search for our customers</h5>
					<hr></hr>
					<div className='table-container'>
						<div className='table-filters'>
							<DropdownFilter
								items={filter}
								selectedFilter={selectedFilter}
								onItemSelect={this.handleFilter}
								filterTitle={"Cities"}
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
							<Pagination
								itemsCounter={totalCount}
								pageSize={pageSize}
								currentPage={currentPage}
								onPageChange={this.handlePageChange}
							/>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	getPageData() {
		const {
			pageSize,
			currentPage,
			customers: allCustomers,
			selectedFilter,
			sortColumn,
		} = this.state;

		const finalFilter =
			selectedFilter && selectedFilter._id
				? allCustomers.filter((m) => m.city._id === selectedFilter._id)
				: allCustomers;

		// _.orderBy(data, columns to filter (can be multiple), order to filter (can be multiple))
		const finalSort = _.orderBy(
			finalFilter,
			[sortColumn.path],
			[sortColumn.order]
		);

		const customers = paginate(finalSort, currentPage, pageSize);

		return { totalCount: finalFilter.length, data: customers };
	}

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handleFilter = (itemFilter) => {
		this.setState({ currentPage: 1, selectedFilter: itemFilter });
	};

	handleSort = (sortColumn) => {
		this.setState({ currentPage: 1, sortColumn: sortColumn });
	};

	handleForm() {
		const { customers } = this.state;

		return customers.map((c) => <h1>{c.id}</h1>);
	}
}

export default Customers;
