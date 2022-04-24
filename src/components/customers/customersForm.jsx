import React from "react";
import NavBar from "../commom/navbar";

const CustomersForm = ({ match, history }) => {
	return (
		<React.Fragment>
			<NavBar />
			<div className='container-bordered'>
				<h1> Customer Form </h1>
				<h4> ID {match.params.id} </h4>
				<h4> {match.params.id} </h4>
				<hr></hr>
				<button
					className='btn btn-primary'
					onClick={() => history.push("/customers/")}>
					Back
				</button>
			</div>
		</React.Fragment>
	);
};

export default CustomersForm;
