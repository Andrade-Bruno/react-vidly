import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = (props) => {
	return (
		<React.Fragment>
			{props.user && (
				<>
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
							<div className='nav-link'>
								<i className='fa fa-user'></i>
								&nbsp;{props.user.name}
							</div>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/logout/'>
								<i className='fa fa-sign-out'></i>
							</NavLink>
						</li>
					</ul>
				</>
			)}
		</React.Fragment>
	);
};

export default NavBar;
