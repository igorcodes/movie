import React from "react";
import callApi from '../../../api/api';
import Cookies from 'universal-cookie';
import StarRatingComponent from 'react-star-rating-component';

const cookies = new Cookies();

export default class VideoPage extends React.Component {
	constructor() {
		super();
		this.state = {
			movieDetails: [],
		};
	}
	

	componentDidMount() {
		const {	match: {params}	} = this.props;

		callApi.get(`/movie/${params.id}`, {
			params: {language: "ru-RU"}
		}).then(data => {this.setState({  movieDetails: data  });
	});
	}


	/* onStarClick(nextValue) {
		cookies.set("nextValue", nextValue, {
				path: "/",
				maxAge: 2592000
			});
		this.setState({rating: nextValue});
		cookies.set(this.props.match.params.id, nextValue);
		console.log("nextValue2", nextValue);
		console.log("this.props.match.params.id", this.props.match.params.id);


		console.log("this.state.movieDetails.backdrop_pathh", this.state.movieDetails.backdrop_path);
		console.log("this.state.movieDetails.original_title", this.state.movieDetails.original_title);

		cookies.set(this.state.movieDetails.backdrop_path, this.state.movieDetails.original_title);
	} */

	
	render() {
		const {movieDetails} = this.state;
		const imgurl = `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`;
		
		console.log("movieDetails", movieDetails)
		return (
						  <div className="container">
							  
							<div className="card bg-dark text-white mb-3" style={{ width: "80%" }}>

								<img className="card-img-top card-img--height" src={imgurl} style={{ width: "100%", height: "100%" }} alt="" />

								<div className="card-body">
								<div className="card-header">
								<h4 className="card-title"><strong><em>Фильм: "{movieDetails.title}</em>"</strong></h4>
							
							<br/><h4>Мой рейтинг: {cookies.get(movieDetails.id) ? cookies.get(movieDetails.id) : 1} из 10.</h4>
							{/* <StarRatingComponent 
								name={movieDetails.item} 
								starCount={10}
								value={cookies.get(movieDetails.id) ? cookies.get(movieDetails.id) : 1}
								onStarClick={this.onStarClick.bind(this)}
								/><br/><br/> */}
								
							<br/><div className="card-text"><strong>Дата релиза: </strong> {movieDetails.release_date}</div>
							<div className="card-text"><strong>Рейтинг TheMovieDB: </strong> {movieDetails.vote_average}</div>
									<div className="card-text"><strong>Популярность: </strong> {movieDetails.popularity}</div>
							<div className="card-text"><strong>Количество голосов: </strong> {movieDetails.vote_count}</div>
								</div><br/>

									<div className="card-text"><strong>Описание: </strong> {movieDetails.overview}</div><br/>
								
								</div>
							</div>
															
							
						  </div>
		)
	}
}

/* {this.props.match.params.id} */

