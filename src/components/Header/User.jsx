import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap"

import React, { Component } from "react";

import {callApi, API_URL, API_KEY_3} from "../../api/api";

class User extends Component {
	state = {
		dropdownOpen: false
	};

	toggleDropdown = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	};

	handleLogOut = () => {
		callApi(`${API_URL}/authentication/session?api_key=${API_KEY_3}`, {
			method: "DELETE",
			mode: "cors",
			headers: {
              "Content-type": "application/json"
            },
			body: JSON.stringify({session_id: this.props.session_id})
		}).then(() => {
			this.props.logOut();
		});
	}

	render () {
		const { user, logOut } = this.props;
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
				<DropdownToggle  tag="div" onClick={this.toggleDropdown} data-toggle="dropdown" aria-expanded={this.state.dropdownOpen} >
					<img width="40" className="rounded-circle" onClick={this.toggleDropdown} src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`} alt="" />
				</DropdownToggle>

				<DropdownMenu end>
					<DropdownItem onClick={this.handleLogOut}>Выход</DropdownItem>
					<DropdownItem>Избранные</DropdownItem>
				</DropdownMenu>

			</Dropdown>
		);
	}
}

export default User
