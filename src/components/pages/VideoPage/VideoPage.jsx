import React from "react";
import callApi from '../../../api/api';

export default class VideoPage extends React.Component {
	constructor() {
		super();
		this.state = {
			movieDetails: []
		};
	}
	componentDidMount() {
		const {	match: {params}	} = this.props;

		callApi.get(`/movie/${params.id}`, {
			params: {language: "ru-RU"}
		}).then(data => {this.setState({  movieDetails: data  });
	});
	}
	
	render() {
		const {movieDetails} = this.state;
		const imgurl = `https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}`;
		
		console.log("movieDetails", movieDetails)
		return (
						  <div className="container">
							  <div className="col-4">
								  
								  <img src={imgurl} width="100%" />
							  </div>
							  <div className="col-6">
								  <h6>{movieDetails.title}</h6>
								  <h6>{movieDetails.overview}</h6>
								  <h6>{movieDetails.vote_average}</h6>
							  </div>
						  </div>
		)
	}
}

/* {this.props.match.params.id} */

