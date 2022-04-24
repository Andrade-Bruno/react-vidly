import React from "react";
import Input from "./input";

const SearchBar = (props) => {
	const { label, ...rest } = props;
	return (
		<React.Fragment>
			<div className='search-bar'>
				<Input label={label} placeholder='Search...' {...rest} />
				{/* <button className='btn'>
					<i className='fa fa-search' aria-hidden='true'></i>
				</button> */}
			</div>
		</React.Fragment>
	);
};

export default SearchBar;
