import React from "react";
import Filters from "../../Filters/Filters";
import VideoListContainer from "../../Videos/VideoListContainer";
import '../../../App.css';
 

export default class VideosPage extends React.Component {
  constructor() {                              //создаю состояние конструктор, фильтров вверху всего кода (стандартно) для того чтобы при смене селекта-фильта мы отправляли новый запрос для получения нового VideoList. Детектит изменение пропсов и делает новый запрос  
    super()

    this.state = {                              //все вильтры и их значения буду записывать в обьект filters
      filters: {
        sort_by: "vote_count.desc",
        primary_release_year: 2021,
        with_genres: [],
        search: [] 
      },
      page: 1
    };
  }

                                                  //после того как выберем опцию сортирвки - будет меняться состояние и новое знаяение sort_by - и оно будет спускаться в filters и VideoList
  onChangeFilters = (event) => {                  //для Filters.js чтобы при изменении селлекта (фильтра) менялся обьект VideoList
    const newFilters = { ...this.state.filters,   //значит константа newFilters равняется обновленному ...this.state.filters
      [event.target.name]: event.target.value     //обновляю ключ который нам нужен, event.target.name меняю на event.target.value
    };
    this.setState({                               //делаем функциональный компонент, вместо ретурна будет возращать  //меняем состояние стандартно (this.setState принимает обьект) - после сменя фильтра
      filters: newFilters                         //обновляю фильтр       
    });
    console.log(event.target.name, event.target.value)
  }; 

                                                 //функция изменения состояния page, просто кнопки вперед/назад
  onChangePage = page => {
    console.log(page);
    this.setState({
      page                                       //идентично page: page, (page будем менять на page который мы получили  )б page: page - если ключ совпадает с переменной то это потом преобразуется в ключ: значение с помощью ES6
    });
  };

 

  onChangeGenre  = event => {
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
  }; 

  render() {
    const { filters, page} = this.state;         //без этого ниже <Filters page={this.state.page} filters={this.state.filters}
    return (
	<div className="container">
        <div className="row mt-4">

          <div className="col-4">
            <div className="card" style={{width: "100%"}}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters page={page} /* total_pages={total_pages} */ filters={filters} onChangeFilters={this.onChangeFilters} onChangePage={this.onChangePage}  onChangeGenre={this.onChangeGenre} />
              </div>
            </div>
          </div>

          <div className="col-8">
            
            <VideoListContainer filters={this.state.filters} page={page} onChangePage={this.onChangePage} />     {/* перекинул page={page} в VideoList, и теперь в нем есть page и там можно работать со страницами */}
          </div>

        </div>
      </div>
    );
  }
};
