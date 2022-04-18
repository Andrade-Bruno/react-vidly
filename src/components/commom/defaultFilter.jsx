import React from "react";

const DefaultFilter = (props) => {
	const { items, defaultKey, defaultName, onItemSelect, selectedFilter } =
		props;
	return (
		<React.Fragment>
			<ul className='list-group'>
				{items.map((i) => (
					<li
						key={i._id}
						className={
							i === selectedFilter
								? "list-group-item active"
								: "list-group-item"
						}
						onClick={() => onItemSelect(i)}>
						{i.name}
					</li>
				))}
			</ul>
		</React.Fragment>
	);
};

DefaultFilter.defaultProps = {
	defaultKey: "_id",
	defaultName: "name",
};

export default DefaultFilter;
