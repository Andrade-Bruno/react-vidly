import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
	return (
		<React.Fragment>
			<ul className='nav nav-tabs'>
				<li className='nav-item'>
					<h1 className='nav-link disabled'>Vidly</h1>
				</li>
				<li className='nav-item'>
					<NavLink className='nav-link' to='/home'>
						Home
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink className='nav-link' to='/movies'>
						Movies
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink className='nav-link' to='/customers'>
						Customers
					</NavLink>
				</li>
				<li className='nav-item'>
					<NavLink className='nav-link' to='/rentals'>
						Rentals
					</NavLink>
				</li>
			</ul>
		</React.Fragment>
	);
};

export default NavBar;
