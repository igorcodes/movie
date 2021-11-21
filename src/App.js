import React from "react";
import './App.css';
import Header from "./components/Header/Header";
import Cookies from 'universal-cookie';
import {API_URL, API_KEY_3, callApi} from "./api/api"

import VideosPage from "./components/pages/VideosPage/VideosPage"
import VideoPage from "./components/pages/VideoPage/VideoPage"

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
 
const cookies = new Cookies();

export default class App extends React.Component {
  constructor() {                              //создаю состояние конструктор, фильтров вверху всего кода (стандартно) для того чтобы при смене селекта-фильта мы отправляли новый запрос для получения нового VideoList. Детектит изменение пропсов и делает новый запрос  
    super()

    this.state = {                              //все вильтры и их значения буду записывать в обьект filters
      user: null,
      session_id: null,
    };
  }

  updateUser = user => {                        //нужно передать эту функцию в LoginForm, для этого передаю в Header (updateUser={this.updateUser}), после перехожу в Header (он уже в пропсах Header), и в хедере нахожу компоненту Login и передаю туда ( <Login updateUser={this.props.updateUser} /> ), перехожу в Login и уже там в LoginForm передаю пропс ( <LoginForm updateUser={this.props.updateUser} /> ) и уже после этого я могу вызывать его в LoginForm 
    this.setState({
      user
    });
  };
  
  updateSessinId = session_id => {        //нужно передать эту функцию в LoginForm, для этого передаю в Header (updateUser={this.updateUser}), после перехожу в Header (он уже в пропсах Header), и в хедере нахожу компоненту Login и передаю туда ( <Login updateUser={this.props.updateUser} /> ), перехожу в Login и уже там в LoginForm передаю пропс ( <LoginForm updateUser={this.props.updateUser} /> ) и уже после этого я могу вызывать его в LoginForm 
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });
  };

  logOut = () => {
    cookies.remove("session_id")                     //при logOut удаляю куки по session_id, обнуляю session_id, обнуляю user
    this.setState({
      session_id: null,
      user: null
    });
  };

  
                                                                //в дидмаунте считаваю сессион айди с куки, если она пустая запрос не выполняем, если там есть сессион ай ди, мы вызываем запрос, получаем юзера, (без модального окна) сразу будем видеть аватар 
  componentDidMount() {                                  //при первом рендере делаем запрос компонент дидмаунт
    const session_id = cookies.get("session_id");         //делать запрос callApi только если уже есть session_id
    console.log(session_id);
    if (session_id) {                                  //если session_id не пустое (если мы логинились раньше то оно не пустое) то я вызываю callApi
      callApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
      .then(user => {                                  //после этого в then делаю апдейт юзера
        this.updateUser(user);
        this.updateSessinId(session_id);
      });
    }
  }

  render() {
    const { user, session_id} = this.state;         //без этого ниже <Filters page={this.state.page} filters={this.state.filters}
    return (
      <BrowserRouter>          

          <Header user={user} updateUser={this.updateUser} session_id={session_id} logOut={this.logOut} updateSessinId={this.updateSessinId} />    {/* 1 в хедер его передали */}
          <Link to="/">Go to home</Link><br/>
          {/* <Link to="/movie/1">1</Link> */}

          <Route exact path="/" component={VideosPage} />
          <Route path="/movie/:id" component={VideoPage} />
        
      </BrowserRouter>
    );
  }
};




/* ,:item.title */


