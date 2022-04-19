import React from "react";

const Favorite = (props) => {
	let newClassName = "fa fa-star-o";
	if (props.favorite) newClassName = "fa fa-star";
	return (
		<React.Fragment>
			<i
				className={newClassName}
				style={{ cursor: "pointer" }}
				aria-hidden='true'
				onClick={props.onClick}></i>
		</React.Fragment>
	);
};

export default Favorite;
