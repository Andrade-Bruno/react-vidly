import React, { Component } from "react";
import NavBar from "./commom/navbar";

class NotFound extends Component {
	render() {
		setTimeout(function () {
			window.location.href = "/movies/";
		}, 2000);

		return (
			<React.Fragment>
				<NavBar />
				<div className='container'>
					<h1>404 Error</h1>
					<h5>Page Not Found</h5>
				</div>
			</React.Fragment>
		);
	}
}

export default NotFound;
