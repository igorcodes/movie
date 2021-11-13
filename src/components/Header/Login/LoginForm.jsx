import React from "react";
/* import CallApi from "../../../api/api";
import validateFields from "./validate";
import Field from "./Field";
import withUser from "../../HOC/withUser"; */

export default class LoginForm extends React.Component {
    state = {                                                 //указал в состоянии пустые username, password, пустой обьект ошибок
        username: "",
        password: "",
        errors: {}
    };

  onChange = e => {                            //функция-обработчки которая принимает таргет нейм и event и после меняет значение на то что казано было в таргете (евент таргет)
    this.setState({
		[e.target.name]: e.target.value
      });
  };

  handleBlur = () => {
	  console.log("on blur");
    const errors = this.validateFields();                   //задаю errors говорю равняйся validateFields
    if (Object.keys(errors).length > 0) {                   //делаю еще одну проверку чтобы не было лишнего рендера
      this.setState(prevState => ({                         //если обьект еррорс больше нуля тогда я хочу вызывать сет стейт, и в этом сет стейте я хочу показывать ошибки, prevState выводит обьект errors
        errors: {
          ...prevState.errors,                              //все что там было плюс обьект errors
          ...errors
        }
      }))
    }
  };

  validateFields = () => {
    const errors = {};

    if (this.state.username === "") {
      errors.username = "Not empty";
	  console.log("Not empty username")
    }

	if (this.state.password === "") {
      errors.password = "Not empty";
	  console.log("Not empty password")
    }
    
	return errors;	
  };


  onLogin = e => {
    e.preventDefault();
	const errors = this.validateFields();
  };
  

  render() {
    const { username, password, errors } = this.state;
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
			className="form-control"
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
				className="form-control"
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
          >
            Вход
          </button>
          
        </form>
      </div>
    );
  }
}

