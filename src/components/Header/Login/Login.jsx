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

	toggleModal = () => {                                   // функция в которой будем менять состояние
		this.setState(prevState => ({
			showLoginForm: !prevState.showLoginForm			//showLoginForm равно противоположное состояние - false и true
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






		/* callApi(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
		.then(data => {
			return callApi(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, 
					{
					method: "POST",  // вторым переметром нужно описать методы 
					mode: "cors", 
					headers: {
						"Content-type": "application/json"
					},    					
					body: JSON.stringify({
					username: "igorzakutajlo",
					password: "olegtpk",
					request_token: data.request_token
					})  //при помощи JSON.stringify превращаю этот обьект в строку
					}
			);
		})  //3 если второй запрос не сработает то третий на получение сессии не вызовется
		.then(data => {	
			console.log("success", data);
			return callApi(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`, 
				{
				method: "POST",  // вторым переметром нужно описать методы
				mode: "cors", 
				headers: {
					"Content-type": "application/json"
					},    //при помощи JSON.stringify превращаю этот обьект в строку
				body: JSON.stringify({  // body это ключ который будет принимать обьект данных
					request_token: data.request_token  //который я получил с предыдущего запроса
				})
				}
			);
		})
		.then(data => {  console.log("session", data);  })
		.catch(error => {	console.log("error", error);		}); */




/* const getToken = () => { //создаю функцию которая будет возвращать промис.  превращаю fetch в промис
			return new Promise((resolve, reject) => {  //промис задается главным способом через конструктор new Promise и принимает функцию где первый аргумент будет ресолв а второй аргумент будет реджект
				fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`) //делаю запрос фетч
				.then(response => {  //внутри него респонс - респонс джейсон//и потом выводим дату.  Но fetch всегда будет суксесс только если есть проблемы с интернетом, неважно какой респонс пришел (401 500) все равно оно будет в then и это не удобно так как при валидации логина приходит 401 о том что  логин или пароль не верные
					if (response.status < 400) {
						return response.json();
					} else {  			//если будет 401 нужно передавать в ошибку
						throw response; //єто ошибка fetchа чтобы перешло в кетч
					} 					//создал промис внутри которого фетч
				})

				// этот then когда все хорошо, у промиса первый аргумент была функция resolve
				.then(data => { resolve(data); })

				// этот catch ловит ошибку
				.catch(response => {
					response.json().then(error => {
						reject(error); //ошибка обрабатывается и превращается в простой обьект, который мы передадим в кетч нашей цепочки
					});
					})
				}); 
		}; //когда getToken возвращает промис у нее появляется then, который первым аргументом принимает data и ее вывожу в консоль


		const validateLogin = (body) => {
			return new Promise((resolve, reject) => {  //промис задается главным способом через конструктор new Promise и принимает функцию где первый аргумент будет ресолв а второй аргумент будет реджект
				fetch(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, 
				{
				method: "POST",  // вторым переметром нужно описать методы 
				mode: "cors", 
				headers: {
					"Content-type": "application/json"
				},    					
				body: JSON.stringify(body)  //при помощи JSON.stringify превращаю этот обьект в строку
				})

				.then(response => {  //внутри него респонс - респонс джейсон//и потом выводим дату.  Но fetch всегда будет суксесс только если есть проблемы с интернетом, неважно какой респонс пришел (401 500) все равно оно будет в then и это не удобно так как при валидации логина приходит 401 о том что  логин или пароль не верные
					if (response.status < 400) {
						return response.json();
					} else {  			//если будет 401 нужно передавать в ошибку
						throw response; //єто ошибка fetchа чтобы перешло в кетч
					} 					//создал промис внутри которого фетч
				})

				// этот then когда все хорошо, у промиса первый аргумент была функция resolve
				.then(data => { resolve(data); })

				// этот catch ловит ошибку
				.catch(response => {
					response.json().then(error => {
						reject(error); //ошибка обрабатывается и превращается в простой обьект, который мы передадим в кетч нашей цепочки
					});
					})
				}); 
		} */




		//1
		/* fetch(`${API_URL}/authentication/token/new?api_key=${API_KEY_3}`)
		.then(response => response.json())
		.then(data => {
			console.log('data', data);  //первый аргумент это url 
			//2
			fetch(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY_3}`, 
				{  //второй аргумент это все эти опшены до .then(response => response.json() где мы пишем метод пост и передаем тело запроса
				method: "POST",  // вторым переметром нужно описать методы 
				mode: "cors", 
				headers: {
					"Content-type": "application/json"
				},    //при помощи JSON.stringify превращаю этот обьект в строку
				body: JSON.stringify({  // body это ключ который будет принимать обьект данных
					username: "igorzakutajlo",
					password: "olegtpk",
					request_token: data.request_token  //который я получил с предыдущего запроса
				})//это уже второй запрос, превращаем  в json
			})
			.then(response => response.json())
			.then(data => {console.log('data после второго запроса', data);
				//3
				fetch(`${API_URL}/authentication/session/new?api_key=${API_KEY_3}`, {
					method: "POST",  // вторым переметром нужно описать методы
					mode: "cors", 
					headers: {
						"Content-type": "application/json"
					},    //при помощи JSON.stringify превращаю этот обьект в строку
					body: JSON.stringify({  // body это ключ который будет принимать обьект данных
						request_token: data.request_token  //который я получил с предыдущего запроса
					})//это уже второй запрос, превращаем  в json
				}
			)
			.then(response => response.json())
			.then(data => {
				console.log("session", data);
			});
			});
		}); */