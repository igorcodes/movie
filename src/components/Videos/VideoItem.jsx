import React from "react";
//import Favorite from "./Favorite";
//import WillWatch from "./WillWatch";
import { Link } from "react-router-dom";
//import Image from "../UIComponents/Image";
//import Progressbar from "../UIComponents/Progressbar";

export default class VideoItem extends React.PureComponent {
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
      <div className="card-text"><strong>Дата релиза:</strong> {item.release_date}</div>
      <div className="card-text"><strong>Рейтинг:</strong> {item.vote_average}</div>
			<div className="card-text"><strong>Популярность:</strong> {item.popularity}</div>
      <div className="card-text"><strong>Количество голосов:</strong> {item.vote_count}</div>
          </div>

			<div className="card-text"><strong>Описание:</strong> {item.overview}</div>
      <Link to={`/movie/${item.id}`} className="btn btn-primary">Полное описание</Link>
        
		</div>
      </div>
    );
  }
}

/* , ${item.title} */
