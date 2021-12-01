import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from "reactstrap"

import React, { Component } from "react";

import {callApi, API_URL, API_KEY_3} from "../../api/api";
import { Link } from "react-router-dom";

class User2 extends Component {
	state = {
		dropdownOpen: false
	};

	toggleDropdown = () => {
		this.setState(prevState => ({
			dropdownOpen: !prevState.dropdownOpen
		}));
	};

	

	render () {
		const { user } = this.props;
		return (
			<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown}>
				<DropdownToggle  tag="div" onClick={this.toggleDropdown} data-toggle="dropdown" aria-expanded={this.state.dropdownOpen} >
					{/* <img width="40" className="rounded-circle" onClick={this.toggleDropdown} src={`https://secure.gravatar.com/avatar/${user.avatar.gravatar.hash}.jpg?s=64"`} alt="" /> */}
				</DropdownToggle>

				<DropdownMenu end>
					<DropdownItem><Link to="/my-library">Избранные</Link></DropdownItem>
				</DropdownMenu>

			</Dropdown>
		);
	}
}

export default User2
