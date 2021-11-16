import React from "react";
import Login from "./Login/Login";
import User from "./User";

class Header extends React.Component {
	render() {                                 {/* 2 в хедере его получили и передали дальше */}
		const {user, updateUser, updateSessinId, session_id, logOut} = this.props  //деструктурирую пропс компоненты Header, в нее раньше передал функции user, updateUser. тут уже я получаю user как пропс, помтому что я перед этим передал его из app.js (в рендере внес его в стейт и передал ниже <Header user={user} updateUser={this.updateUser} />)
		return (
			<nav className="navbar navbar-dark bg-primary">
				<div className="container">
					<ul className="navbar-nav">
						<li className="nav-item active">
							<button className="btn btn-dark" type="button" onClick={this.sendPromises}>
								Home
							</button>
						</li>
					</ul>                {/*  если user не налл а наполненный , тогда выводить компонент <User /> а иначе выводить <Login updateUser={updateUser} />  */}
					{ user ? <User user={user} session_id={session_id} logOut={logOut}  /> : <Login updateUser={updateUser} updateSessinId={updateSessinId} /> }
					
				</div>
			</nav>
		);
	}
}

export default Header;