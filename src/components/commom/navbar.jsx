import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<React.Fragment>
			<ul className='nav navbar-light nav-tabs justify-content-center '>
				<li className='nav-item'>
					<NavLink className='nav-link' to='/movies/'>
						Movies
					</NavLink>
				</li>
				<li className='nav-item '>
					<NavLink className='nav-link' to='/customers/'>
						Customers
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink className='nav-link' to='/rentals/'>
						Rentals
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink className='nav-link' to='/login/'>
						Login
					</NavLink>
				</li>
			</ul>
		</React.Fragment>
	);
};

export default NavBar;
