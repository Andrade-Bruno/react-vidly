import React from "react";

const Favorite = (props) => {
	let newClassName = "fa fa-heart-o";
	if (props.favorite) newClassName = "fa fa-heart";
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
