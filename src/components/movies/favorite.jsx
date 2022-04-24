import React from "react";

const Favorite = (props) => {
	let newClassName = "fa fa-star-o";
	if (props.favorite) newClassName = "fa fa-star";

	return (
		<React.Fragment>
			<button
				className='btn btn-warning'
				style={{ margin: 0, padding: "0.20em 1.25em" }}
				onClick={props.onClick}>
				<i
					className={newClassName}
					style={{ cursor: "pointer" }}
					aria-hidden='true'></i>
			</button>
		</React.Fragment>
	);
};

export default Favorite;
