import React from "react";
//import Favorite from "./Favorite";
//import WillWatch from "./WillWatch";
//import { Link } from "react-router-dom";
//import Image from "../UIComponents/Image";
//import Progressbar from "../UIComponents/Progressbar";

export default class VideoItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <div className="card" style={{ width: "100%" }}>

		  <img className="card-img-top card-img--height"
		  		src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
                alt="" />


        <div className="card-body">
			<h5 className="card-title"><strong><em>Фильм: "{item.title}</em>"</strong></h5>
      <div className="card-text"><strong>Рейтинг:</strong> {item.vote_average}</div>
			<div className="card-text"><strong>Популярность:</strong> {item.popularity}</div>
			<div className="card-text"><strong>Описание:</strong> {item.overview}</div>
        
		</div>
      </div>
    );
  }
}


