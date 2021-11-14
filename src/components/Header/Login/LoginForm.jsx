import React from "react";
import {API_URL, API_KEY_3, callApi } from "../../../api/api";

export default class LoginForm extends React.Component {
    state = {                                                 //указал в состоянии пустые username, password, пустой обьект ошибок
        username: "",
        password: "",
        errors: {},
        submitting: false
    };

  onChange = e => {                            //функция-обработчки которая принимает таргет нейм и event и после меняет значение на то что казано было в таргете (евент таргет)
    this.setState({
		[e.target.name]: e.target.value
      });
  };

  handleBlur = () => { console.log("on blur"); };

  validateFields = () => {
    const errors = {};
    if (this.state.username === "") {
      errors.username = "Not empty";                         //добавить алерт не пустой инпут
    }
    return errors;	
  };

  onSubmit = () => {
    this.setState({
      submitting: true
    });
    callApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
      .then(data => {
        return callApi(
          `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              username: this.state.username,
              password: this.state.password,
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        return callApi(
          `${API_URL}/authentication/session/new?api_key=${API_KEY_3}`,
          {
            method: "POST",
            mode: "cors",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({
              request_token: data.request_token
            })
          }
        );
      })
      .then(data => {
        this.props.updateSessinId(data.session_id);    //обновляю состояние data.session_id после того как его получил, и вызвать его перед тем как я буду отправлять запрос на получение юзера
        return callApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${data.session_id}`);
      })
      .then(user => {  //тут будет получение юзера
        this.setState({submitting: false}, () => {
          this.props.updateUser(user);   //и уже в эту функцию буду передавать наш респонс то что приходит в api. мы нажимаем на вход, получаем юзера и поднимаем аж в app и потом в зависимости от app мы будем что-то делать 
        });
      })

      .catch(error => {
        console.log("error", error);
        alert(error.status_message);
        this.setState({
          submitting: false,
          errors: {
            base: error.status_message
          }
        });
      });
  };

  onLogin = e => {
    e.preventDefault();
	  const errors = this.validateFields();
    if (Object.keys(errors).length > 0) {
      this.setState(prevState => ({
        errors: {
          ...prevState.errors,
          ...errors
        }
      }))
    } else {                                             //если есть ошибки - показывать ошибки, инча делать наш запрос
      this.onSubmit();
    }
  };
  
  render() {
    const { username, password, errors, submitting } = this.state;
    return (
      <div className="form-login-container">
        <form className="form-login">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Авторизация
          </h1>
		  <div className="form-login-container">
			  <label htmlFor="username">Пользователь</label>
		  
          <input
		  	    type="text"
			      className={ errors.username ? "form-control invalid" : "form-control" }
            id="username"
            placeholder="Пользователь"
            name="username"
            value={username}
            onChange={this.onChange}
			      onBlur={this.handleBlur}                                                             //когда убираешь курсор с поля
          />
		  {errors.username && ( <div className="invalid-feedback">{errors.username}</div> )}
		  </div>

		  <div className="form-group"><br/>
			  <label htmlFor="username">Пароль</label>
			  <input
				type="password"
				className={ errors.password ? "form-control invalid" : "form-control" }
				id="password"
				placeholder="Пароль"
				name="password"
				value={password}
				onChange={this.onChange}
			/>
			{errors.password && ( <div className="invalid-feedback">{errors.password}</div> )}
		  </div><br/>
          
          <button
            type="submit"
            className="btn btn-lg btn-primary btn-block"
            onClick={this.onLogin}
            disabled={submitting}
          >   Вход   </button>
          {errors.base && (  <div className="invalid-feedback text-center">{errors.base}</div>   )}
          
        </form>
      </div>
    );
  }
}

