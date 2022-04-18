import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
	const { itemsCounter, pageSize, currentPage, onPageChange } = props;
	const pagesCount = Math.ceil(itemsCounter / pageSize);
	const pages = _.range(1, pagesCount + 1);
	return (
		<React.Fragment>
			<nav>
				<ul className='pagination'>
					{pages.map((p) => (
						<li
							className={p === currentPage ? "page-item active" : "page-item"}
							key={p}>
							<a className='page-link' onClick={() => onPageChange(p)}>
								{p}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</React.Fragment>
	);
};

Pagination.propTypes = {
	itemsCounter: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
