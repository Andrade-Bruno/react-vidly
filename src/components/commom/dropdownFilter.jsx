import React, { Component } from "react";

class DropdownFilter extends Component {
	state = {
		handleShow: false,
	};

	render() {
		const {
			items,
			defaultKey,
			defaultName,
			onItemSelect,
			selectedFilter,
			filterTitle,
		} = this.props;

		const { handleShow } = this.state;

		let classButton = "btn btn-primary dropdown-toggle";
		let classUl = "dropdown-menu";
		if (handleShow === true) {
			classButton += " show";
			classUl += " show";
		}

		return (
			<React.Fragment>
				<div
					className='dropdown clickable'
					onClick={() => this.handleDropdown()}>
					<button
						className={classButton}
						type='button'
						id={filterTitle}
						data-bs-toggle='dropdown'
						aria-expanded='true'
						style={{ width: "100%" }}>
						{filterTitle}
					</button>
					<ul className={classUl} aria-labelledby={filterTitle}>
						{items.map((i) => (
							<li
								key={i[defaultKey]}
								className={
									i === selectedFilter
										? "dropdown-item active"
										: "dropdown-item"
								}
								onClick={() => onItemSelect(i)}>
								{i[defaultName]}
							</li>
						))}
					</ul>
				</div>
			</React.Fragment>
		);
	}

	handleDropdown() {
		const { handleShow } = this.state;

		if (handleShow === true) {
			this.setState({ handleShow: false });
		} else {
			this.setState({ handleShow: true });
		}
	}
}

DropdownFilter.defaultProps = {
	defaultKey: "_id",
	defaultName: "name",
};

export default DropdownFilter;
