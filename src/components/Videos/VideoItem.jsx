import React from "react";
//import Favorite from "./Favorite";
//import WillWatch from "./WillWatch";
import { Link } from "react-router-dom";
//import Image from "../UIComponents/Image";
//import Progressbar from "../UIComponents/Progressbar";
import StarRatingComponent from 'react-star-rating-component';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class VideoItem extends React.PureComponent {

  constructor() {
    super();
    this.state = {
      rating: (cookies.get("nextValue") ? cookies.get("nextValue") : 1)
    };
  }
 
  onStarClick(nextValue, prevValue, item) {
    cookies.set("nextValue", nextValue, {
			path: "/",
			maxAge: 2592000
		});
    this.setState({rating: nextValue});
    cookies.set(this.props.item.id, nextValue);
    console.log("nextValue1", nextValue);
    
    cookies.set(this.props.item.backdrop_path, this.props.item.original_title);
    console.log("cookies", cookies);
  }

  componentDidUpdate() {                                  //при первом рендере делаем запрос компонент дидмаунт
    const nextValue = cookies.get("nextValue");         //делать запрос callApi только если уже есть session_id
    console.log("nextValue2", nextValue);
    //this.state.rating = nextValue;
    
  }

  

  render() {
    const { item } = this.props;
    const imagePath = item.backdrop_path || item.poster_path;
    return (
      <div className="card bg-dark text-white mb-3" style={{ width: "100%" }}>

		  <img className="card-img-top card-img--height"
		  		src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ""}
                alt="" />


        <div className="card-body">
          <div className="card-header">
			<Link to={`/movie/${item.id}`} params={{item:item}} {...item} className="card-title"><strong><em>Фильм: "{item.title}</em>"</strong></Link>
      
       <br/><br/><h4>Мой рейтинг: {cookies.get(this.props.item.id) ? cookies.get(this.props.item.id) : 1} из 10.</h4>
        <StarRatingComponent 
          name={this.props.item} 
          starCount={10}
          value={cookies.get(this.props.item.id) ? cookies.get(this.props.item.id) : 1}
          onStarClick={this.onStarClick.bind(this)}
        /><br/>
        
      {/* <div className="card-text"><strong>Дата релиза: </strong> {item.release_date}</div>
      <div className="card-text"><strong>Рейтинг TheMovieDB: </strong> {item.vote_average}</div>
			<div className="card-text"><strong>Популярность: </strong> {item.popularity}</div>
      <div className="card-text"><strong>Количество голосов: </strong> {item.vote_count}</div> */}
          </div>

			<div className="card-text"><strong>Описание: </strong> {item.overview}</div>
      <Link to={`/movie/${item.id}`} className="btn btn-primary">Полное описание</Link>
        
		</div>
      </div>
    );
  }
}

/* , ${item.title} */
