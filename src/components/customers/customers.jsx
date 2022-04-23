import React, { Component } from "react";
import { getCustomers } from "../../services/fakeCustomerService";

import CustomersTable from "./customersTable";

class Customers extends Component {
	state = {
		customers: [],
	};

	componentDidMount() {
		const customers = getCustomers();
		this.setState({ customers });
	}

	render() {
		const { customers } = this.state;
		return (
			<React.Fragment>
				<div className='container-bordered'>
					<h1>Customers</h1>
					<h5>Search for our customers</h5>
					<hr></hr>
					<div className='table-container'>
						<div className='table-filters'></div>
						<div className='table-paginated'>
							<table>
								<thead>
									<th>Name</th>
								</thead>
								<tbody>
									{customers.map((c) => (
										<tr>{c.firstName}</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}

	handleForm() {
		const { customers } = this.state;

		return customers.map((c) => <h1>customer.id</h1>);
	}
}

export default Customers;
