import React from "react";

const MovieForm = ({ match, history }) => {
	return (
		<React.Fragment>
			<div className='container-bordered'>
				<h1> Movie Form </h1>
				<h5> ID {match.params.id} </h5>
				<hr></hr>
				<button
					className='btn btn-primary'
					onClick={() => history.push("/movies/")}>
					Back
				</button>
			</div>
		</React.Fragment>
	);
};

export default MovieForm;
