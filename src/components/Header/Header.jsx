import React from "react";
import Login from "./Login/Login";

class Header extends React.Component {
	render() {
		return (
			<nav className="navbar navbar-dark bg-primary">
				<div className="container">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<button className="btn btn-dark" type="button" onClick={this.sendPromises}>
								Home
							</button>
						</li>
					</ul>
					<Login />
				</div>
			</nav>
		);
	}
}

export default Header;