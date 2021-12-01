import React from "react";
import Login from "./Login/Login";
import User from "./User";
import User2 from "./User2";
import { Link } from "react-router-dom";
import Authfb from "./Authfb"

class Header extends React.Component {
	render() {                                
		const {user, updateUser, updateSessinId, session_id, logOut} = this.props  
		return (
			<nav className="navbar navbar-dark bg-primary">
				<div className="container">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<button className="btn btn-light" type="button" onClick={this.sendPromises}>
							<Link to="/">На главную</Link>
							</button>
						</li>
					</ul>               
					{ user ? <User user={user} session_id={session_id} logOut={logOut}  /> : <Login updateUser={updateUser} updateSessinId={updateSessinId} /> }
					<Authfb />
					
				</div>
			</nav>
		);
	}
}

export default Header;