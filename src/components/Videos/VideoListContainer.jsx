import React from "react";
import VideoList from "./VideoList";
import {API_URL, API_KEY_3} from "../../api/api";
import queryString from "query-string";
import { TagCloud } from 'react-tagcloud'

const data = [
	{ value: 'Spider', count: 38 },
	{ value: 'Kill', count: 15 },
	{ value: 'Мстители', count: 28 },
	{ value: 'Boss', count: 25 },
	{ value: 'Red', count: 33 },
	{ value: 'Rabbit', count: 18 },
	{ value: 'Man', count: 20 },
	{ value: 'Free', count: 35 },
  ]

export default class VideoListContainer extends React.Component {
	constructor() {
		super();

		this.state = {
			movies: []                              
		};
	}
	
	
	getVideos = (filters, page) => {                                           
		const { sort_by, primary_release_year, search, with_genres } = filters;
		const queryStringParams = {
		api_key: API_KEY_3,
		language: "ru-RU",
		sort_by: sort_by,
		page: page,
		primary_release_year: primary_release_year,
		query: search
		};

		if (with_genres.length > 0)
		queryStringParams.with_genres = with_genres.join(",");

		if(search.length > 0) {
			const sort_by = this.props.filters.sort_by;
		const primary_release_year = this.props.filters.primary_release_year;
		const search = this.props.filters.search;
		const link = `${API_URL}/search/movie?api_key=${API_KEY_3}&language=ru-RU&query=${search}&primary_release_year=${primary_release_year}&sort_by=${sort_by}`;
								fetch(link)
									.then(response => { return response.json(); }) 
									.then(data => { console.log('data', data); this.setState({ movies: data.results }); });	
			
		} else {
			const link = `${API_URL}/discover/movie?${queryString.stringify(
			queryStringParams
			)}`;
			fetch(link)
			.then(response => {
				return response.json();
			})                         
				.then(data => { console.log('data', data); this.setState({ movies: data.results }); });  
		}
	} 

	SimpleCloud = (filters, page) => {
		return (<TagCloud
			minSize={12}
			maxSize={35}
			tags={data}
			onClick={tag => {
			
		const link = `https://api.themoviedb.org/3/search/movie?api_key=4237669ebd35e8010beee2f55fd45546&language=ru-RU&query=${tag.value}&sort_by=popularity.desc`;
								fetch(link)
									.then(response => { return response.json(); }) 
									.then(data => { console.log('data', data); this.setState({ movies: data.results }); });	
			}}
		  />)
	}


	english = (filters, page) => {                                           
		const { sort_by, primary_release_year, search, with_genres } = filters;
		const queryStringParams = {
		api_key: API_KEY_3,
		language: "en-EN",
		sort_by: sort_by,
		page: page,
		primary_release_year: primary_release_year,
		query: search
		};

		const link = `${API_URL}/discover/movie?${queryString.stringify(
			queryStringParams
			)}`;
			fetch(link)
			.then(response => {
				return response.json();
			})                         
				.then(data => { console.log('data', data); this.setState({ movies: data.results }); });
	} 


	russian = (filters, page) => {                                           
		const { sort_by, primary_release_year, search, with_genres } = filters;
		const queryStringParams = {
		api_key: API_KEY_3,
		language: "ru-RU",
		sort_by: sort_by,
		page: page,
		primary_release_year: primary_release_year,
		query: search
		};

		const link = `${API_URL}/discover/movie?${queryString.stringify(
			queryStringParams
			)}`;
			fetch(link)
			.then(response => {
				return response.json();
			})                         
				.then(data => { console.log('data', data); this.setState({ movies: data.results }); });
	} 
		

	componentDidMount() {                                                          
		this.getVideos(this.props.filters, this.props.page);
	}
	
	componentDidUpdate(prevProps) {
		
		if (this.props.filters.sort_by !== prevProps.filters.sort_by) {  
			this.props.onChangePage(1);                                 
			this.getVideos(this.props.filters, 1);                     
		}

		if (this.props.filters.primary_release_year !== prevProps.filters.primary_release_year) {   
			this.props.onChangePage(1);                               
			this.getVideos(this.props.filters, 1);                     
		}

		if (this.props.filters.search !== prevProps.filters.search) {    
			this.props.onChangePage(1);                                
			this.getVideos(this.props.filters, 1);                     
		}

		if (this.props.page !== prevProps.page) {                     
			this.getVideos(this.props.filters, this.props.page);       
		}

		if (this.props.filters.with_genres !== prevProps.filters.with_genres) {  
			this.getVideos(this.props.filters, this.props.page);    
		} 
	}                                                        

	render() {
		const { movies } = this.state;    
		console.log("render");                               
		return (<>
				
				<div className="buttonlang" align="right">
				<ul className="navbar-nav">
					<li className="nav-item active">
						<button className="btn btn-light" type="button" onClick={this.english}>
							Английский язык
						</button>
					</li>
				</ul> 

				<ul className="navbar-nav">
					<li className="nav-item active">
						<button className="btn btn-light" type="button" onClick={this.russian}>
							Русский язык
						</button>
					</li>
				</ul> 
				</div>
			

			<h5>Облако популярных тегов:</h5>
			{this.SimpleCloud()}<br/>
			<h3 align="center">Популярные фильмы:</h3>
			<VideoList movies={movies} />
			</>
		);
	}
};

