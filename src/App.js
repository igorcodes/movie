import React from "react";
import Filters from "./components/Filters/Filters";
import VideoList from "./components/Videos/VideoList";
import './App.css';

export default class App extends React.Component {
  constructor() { //создаю состояние конструктор, фильтров вверху всего кода (стандартно) для того чтобы при смене селекта-фильта мы отправляли новый запрос для получения нового VideoList. Детектит изменение пропсов и делает новый запрос  
    super()

    this.state = {  //все вильтры и их значения буду записывать в обьект filters
      filters: {
        sort_by: "revenue.desc"
      }
    };
  }

  //после того как выберем опцию сортирвки - будет меняться состояние и новое знаяение sort_by - и оно будет спускаться в filters и VideoList
  onChangeFilters = (event) => { //для Filters.js чтобы при изменении селлекта (фильтра) менялся обьект VideoList
    const newFilters = { ...this.state.filters,   //значит константа newFilters равняется обновленному ...this.state.filters
      [event.target.name]: event.target.value  //обновляю ключ который нам нужен, event.target.name меняю на event.target.value
    };
    this.setState({ //делаем функциональный компонент, вместо ретурна будет возращать  //меняем состояние стандартно (this.setState принимает обьект) - после сменя фильтра
      filters: newFilters   //обновляю фильтр       
    });
    console.log(event.target.name, event.target.value)
  } 

  render() {
    return (
      <div className="container">
        <div className="row mt-4">

          <div className="col-4">
            <div className="card" style={{width: "100%"}}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters filters={this.state.filters} onChangeFilters={this.onChangeFilters} />
              </div>
            </div>
          </div>

          <div className="col-8">
            <h3>Рекомендуемые фильмы и сериалы:</h3>
            <VideoList filters={this.state.filters} />
          </div>

        </div>
      </div>
    );
  }
};
