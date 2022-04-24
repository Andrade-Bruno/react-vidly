import React, { Component } from "react";
import NavBar from "../commom/navbar";

class Home extends Component {
	render() {
		return (
			<React.Fragment>
				<NavBar />
				<div className='container-bordered'>
					<h1>Home</h1>
				</div>
			</React.Fragment>
		);
	}
}

export default Home;
