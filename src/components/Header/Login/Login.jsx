import React from "react";

import { Modal, ModalBody } from 'reactstrap';
import LoginForm from "./LoginForm"

export default class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			showLoginForm: false
		};
	}

	toggleModal = () => {                                   
		this.setState(prevState => ({
			showLoginForm: !prevState.showLoginForm			
		}))
	}
	
	render() {
		return (
				<div >
					<button className="btn btn-success" type="button" onClick={this.toggleModal}>
						Login TheMovieDB
					</button>
					<Modal isOpen={this.state.showLoginForm} toggle={this.toggleModal}>
						<ModalBody>
							<LoginForm updateUser={this.props.updateUser} updateSessinId={this.props.updateSessinId} />
						</ModalBody>
					</Modal>
				</div>
		);
	}
}




