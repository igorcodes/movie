import React from "react";
import Filters from "../../Filters/Filters";
import VideoListContainer from "../../Videos/VideoListContainer";
import '../../../App.css';
 

export default class VideosPage extends React.Component {
  constructor() {                               
    super()

    this.state = {                              
      filters: {
        sort_by: "popularity.desc",
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
    this.setState({                               
      filters: newFilters                             
    });
    console.log(event.target.name, event.target.value)
  }; 

                                                 
  onChangePage = page => {
    console.log(page);
    this.setState({
      page                                       
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
    const { filters, page} = this.state;         
    return (
	<div className="container">
        <div className="row mt-4">

          <div className="col-4">
            <div className="card" style={{width: "100%"}}>
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters page={page} filters={filters} onChangeFilters={this.onChangeFilters} onChangePage={this.onChangePage}  onChangeGenre={this.onChangeGenre} />
              </div>
            </div>
          </div>

          <div className="col-8">
            
            <VideoListContainer filters={this.state.filters} page={page} onChangePage={this.onChangePage} />    
          </div>

        </div>
      </div>
    );
  }
};
