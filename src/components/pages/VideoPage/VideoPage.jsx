import React from "react";
import callApi from '../../../api/api';
import StarRatingComponent from 'react-star-rating-component';
import Cookies from 'universal-cookie';


import CreateReview from './CreateReview';
import ReviewList from './ReviewList';


function toDate(date) {
  return (new Date(date)).toDateString();
}


/* const cookies = new Cookies(); */

export default class VideoPage extends React.Component {
	constructor() {
		super();
		this.state = {
			movieDetails: [],
			/* rating: (cookies.get("nextValue") ? cookies.get("nextValue") : 1) */
		};
	}
	

	componentDidMount() {
		const {	match: {params}	} = this.props;

		callApi.get(`/movie/${params.id}`, {
			params: {language: "ru-RU"}
		}).then(data => {this.setState({  movieDetails: data  });
	});
	}

	/* componentDidUpdate() {                                  
		const nextValue = cookies.get("nextValue");
		cookies.set(this.props.match.params.id, nextValue);
		console.log(this.props.match.params.id, nextValue);
		console.log("this.props3", this.props.match.params.id);
		//this.state.rating = nextValue;
  	}

	onStarClick(nextValue, prevValue, item) {
		cookies.set(this.props.match.params.id, nextValue, {
				path: `/movie/`,
				maxAge: 2592000
			});
		this.setState({rating: nextValue});
	} */
	
	render() {
		//const { rating } = this.state;
		const name = this.props.title;
		//const prevValue = (cookies.get(this.props.match.params.id) ? cookies.get(this.props.match.params.id) : 1);

		const {movieDetails} = this.state;
		const imgurl = `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`;
		
		console.log("movieDetails", movieDetails)
		return (
						  <div className="container">
							  <div className="col-4">
								  
								  <img src={imgurl} width="100%" />
							  </div>

							  {/* <h4>Мой личный рейтинг3: {rating}</h4>
								<StarRatingComponent 
								name={this.props.item} 
								starCount={10}
								value={cookies.get(this.props.match.params.id) ? cookies.get(this.props.match.params.id) : 1}
								onStarClick={this.onStarClick.bind(this)}
								/> */}

							  <div className="col-6">
								  <h6>{movieDetails.title}</h6>
								  <h6>{movieDetails.overview}</h6>
								  <h6>{movieDetails.vote_average}</h6>
							  </div>

							
								<CreateReview movieDetails={movieDetails} type="movie" />
								{/* <ReviewList movieDetails={movieDetails} type="movie" /> */}
							
						  </div>
		)
	}
}

/* {this.props.match.params.id} */

