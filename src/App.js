import React from "react";
import Filters from "./components/Filters/Filters";
import VideoList from "./components/Videos/VideoList";
import './App.css';
import Header from "./components/Header/Header";
import Cookies from 'universal-cookie';
import {API_URL, API_KEY_3, callApi} from "./api/api"
 
const cookies = new Cookies();

export default class App extends React.Component {
  constructor() { //создаю состояние конструктор, фильтров вверху всего кода (стандартно) для того чтобы при смене селекта-фильта мы отправляли новый запрос для получения нового VideoList. Детектит изменение пропсов и делает новый запрос  
    super()

    this.state = {  //все вильтры и их значения буду записывать в обьект filters
      user: null,
      session_id: null,
      filters: {
        sort_by: "vote_count.desc",
        primary_release_year: 2021,
        /* with_genres: []  */
      },
      page: 1
    };
  }

  updateUser = user => {  //нужно передать эту функцию в LoginForm, для этого передаю в Header (updateUser={this.updateUser}), после перехожу в Header (он уже в пропсах Header), и в хедере нахожу компоненту Login и передаю туда ( <Login updateUser={this.props.updateUser} /> ), перехожу в Login и уже там в LoginForm передаю пропс ( <LoginForm updateUser={this.props.updateUser} /> ) и уже после этого я могу вызывать его в LoginForm 
    this.setState({
      user
    });
  };
  
  updateSessinId = session_id => {  //нужно передать эту функцию в LoginForm, для этого передаю в Header (updateUser={this.updateUser}), после перехожу в Header (он уже в пропсах Header), и в хедере нахожу компоненту Login и передаю туда ( <Login updateUser={this.props.updateUser} /> ), перехожу в Login и уже там в LoginForm передаю пропс ( <LoginForm updateUser={this.props.updateUser} /> ) и уже после этого я могу вызывать его в LoginForm 
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    this.setState({
      session_id
    });
  };

  //после того как выберем опцию сортирвки - будет меняться состояние и новое знаяение sort_by - и оно будет спускаться в filters и VideoList
  onChangeFilters = (event) => { //для Filters.js чтобы при изменении селлекта (фильтра) менялся обьект VideoList
    const newFilters = { ...this.state.filters,   //значит константа newFilters равняется обновленному ...this.state.filters
      [event.target.name]: event.target.value  //обновляю ключ который нам нужен, event.target.name меняю на event.target.value
    };
    this.setState({ //делаем функциональный компонент, вместо ретурна будет возращать  //меняем состояние стандартно (this.setState принимает обьект) - после сменя фильтра
      filters: newFilters   //обновляю фильтр       
    });
    console.log(event.target.name, event.target.value)
  }; 

  //функция изменения состояния page, просто кнопки вперед/назад
  onChangePage = page => {
    console.log(page);
    this.setState({
      page  //идентично page: page, (page будем менять на page который мы получили  )б page: page - если ключ совпадает с переменной то это потом преобразуется в ключ: значение с помощью ES6
    });
  };

  setTotalPages = total_pages => {
    this.setState({ total_pages })
  };

  /* onChangeGenre  = event => {
    const id = event.target.value;
    const { genres } = this.state.filters;
    let newGenres = [];
    if (genres.includes(id)) {
      newGenres = genres.filter(el => el !== id);
    } else {
      newGenres = [...genres, id];
    }
    this.setState(prevState => {
      return {
        filters: {
          ...prevState.filters,
          genres: newGenres,
        },
      };
    });
  }; */
                        //в дидмаунте считаваю сессион айди с куки, если она пустая запрос не выполняем, если там есть сессион ай ди, мы вызываем запрос, получаем юзера, (без модального окна) сразу будем видеть аватар 
  componentDidMount() {                                //при первом рендере делаем запрос компонент дидмаунт
    const session_id = cookies.get("session_id");         //делать запрос callApi только если уже есть session_id
    console.log(session_id);
    if (session_id) {                                  //если session_id не пустое (если мы логинились раньше то оно не пустое) то я вызываю callApi
      callApi(`${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`)
      .then(user => {                                  //после этого в then делаю апдейт юзера
        this.updateUser(user);
      });
    }
  }

  render() {
    const { filters, page, user} = this.state; //без этого ниже <Filters page={this.state.page} filters={this.state.filters}
    return (
      <div>
      <Header user={user} updateUser={this.updateUser} updateSessinId={this.updateSessinId} />    {/* 1 в хедер его передали */}
      <div className="container">
        <div className="row mt-4">

          <div className="col-4">
            <div className="card" style={{width: "100%"}}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters page={page} /* total_pages={total_pages} */ filters={filters} onChangeFilters={this.onChangeFilters} onChangePage={this.onChangePage} /* onChangeGenre={this.onChangeGenre} */ />
              </div>
            </div>
          </div>

          <div className="col-8">
            <h3>Рекомендуемые фильмы и сериалы:</h3>
            <VideoList filters={this.state.filters} page={page} onChangePage={this.onChangePage} /> {/* перекинул page={page} в VideoList, и теперь в нем есть page и там можно работать со страницами */}
          </div>

        </div>
      </div>
    </div>
    );
  }
};
