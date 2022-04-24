import React, { Component } from "react";
import NavBar from "../commom/navbar";

class Rentals extends Component {
	render() {
		return (
			<React.Fragment>
				<NavBar />
				<div className='container-bordered'>
					<h1>Rentals</h1>
					<h5>Search for our rentals</h5>
					<hr></hr>
				</div>
			</React.Fragment>
		);
	}
}

export default Rentals;
