import React from "react";
import VideoList from "./VideoList";
import {API_URL, API_KEY_3} from "../../api/api";
import queryString from "query-string";
import { TagCloud } from 'react-tagcloud'

const data = [
	{ value: 'Spider', count: 38 },
	{ value: 'Kill', count: 15 },
	{ value: 'Master', count: 28 },
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
			movies: []                              //это изменяемый массив, должен быть в стейте, изначально пустой без данных (пока не получили их с API), данные будеи получать в componentDidMount
		};
	}

	
	
	getVideos = (filters, page) => {                                           //аргумент filters буду пробрасывать в эту функцию
		const { sort_by, primary_release_year, search, with_genres } = filters;
		const queryStringParams = {
		api_key: API_KEY_3,
		language: "en-EN",
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
		const link = `${API_URL}/search/movie?api_key=${API_KEY_3}&language=ru-RU&query=${search}&primary_release_year=${primary_release_year}&sort_by=${sort_by}`;// Обращаемся к url, делаем фетч и получаем данные и после этого изменяем наше состояние; &language=ru-RU` - значит пришли мне данные на русском
								fetch(link)
									.then(response => { return response.json(); }) //получаем response и этот response мы преобразуем в обычный js-обьект с помощью json
									.then(data => { console.log('data', data); this.setState({ movies: data.results }); });	
			
		} else {
			const link = `${API_URL}/discover/movie?${queryString.stringify(
			queryStringParams
			)}`;
			fetch(link)
			.then(response => {
				return response.json();
			})                         //получаем response и этот response мы преобразуем в обычный js-обьект с помощью json
				.then(data => { console.log('data', data); this.setState({ movies: data.results }); }); //data.results это наш массив фильмов, setStatом мы изменяем стейт и происходит рендер и в movies.map появляется массив из 20 элементов, мы его мапируем и 
		}
	} 

	SimpleCloud = () => {
		return (<TagCloud
			minSize={12}
			maxSize={35}
			tags={data}
			onClick={tag => {
				//const sort_by = this.props.filters.sort_by;
		//const primary_release_year = this.props.filters.primary_release_year;
		//const search = this.props.filters.search;
		const link = `https://api.themoviedb.org/3/search/movie?api_key=4237669ebd35e8010beee2f55fd45546&language=ru-RU&query=${tag.value}&primary_release_year=2021&sort_by=vote_count.desc`;// Обращаемся к url, делаем фетч и получаем данные и после этого изменяем наше состояние; &language=ru-RU` - значит пришли мне данные на русском
								fetch(link)
									.then(response => { return response.json(); }) //получаем response и этот response мы преобразуем в обычный js-обьект с помощью json
									.then(data => { console.log('data', data); this.setState({ movies: data.results }); });	
			}}
		  />)
	}
		

	/* alert(`'${tag.value}' was selected!`) */
	  

	componentDidMount() {                                                         //этот МЖЦ срабатывает только 1 раз после первого рендера там где и нужно делать все наши ajax-запросы. 
		this.getVideos(this.props.filters, this.props.page);
	}
	
	componentDidUpdate(prevProps) {
		
		if (this.props.filters.sort_by !== prevProps.filters.sort_by) {  //просто сравниваю фильтры, новый такой-же как и старый или нет
			this.props.onChangePage(1);                                 //изменяем состояние чтобы в app - page поменялся и стал 1 
			this.getVideos(this.props.filters, 1);                     //если мы дошли до какой-то страницы и поменяли фильтр, тогда должно вызвать функцию с новым фильтром и ПЕРВОЙ СТРАНИЦЕЙ!!!! т.е. пагинация (переключение страниц) должна сбрасываться
		}

		if (this.props.filters.primary_release_year !== prevProps.filters.primary_release_year) {    //просто сравниваю фильтры, новый такой-же как и старый или нет
			this.props.onChangePage(1);                                //изменяем состояние чтобы в app - page поменялся и стал 1 
			this.getVideos(this.props.filters, 1);                     //если мы дошли до какой-то страницы и поменяли фильтр, тогда должно вызвать функцию с новым фильтром и ПЕРВОЙ СТРАНИЦЕЙ!!!! т.е. пагинация (переключение страниц) должна сбрасываться
		}

		if (this.props.filters.search !== prevProps.filters.search) {    //просто сравниваю фильтры, новый такой-же как и старый или нет
			this.props.onChangePage(1);                                //изменяем состояние чтобы в app - page поменялся и стал 1 
			this.getVideos(this.props.filters, 1);                     //если мы дошли до какой-то страницы и поменяли фильтр, тогда должно вызвать функцию с новым фильтром и ПЕРВОЙ СТРАНИЦЕЙ!!!! т.е. пагинация (переключение страниц) должна сбрасываться
		}

		if (this.props.page !== prevProps.page) {                      //если текущая страница не равна предыдущей
			this.getVideos(this.props.filters, this.props.page);       //тогда вызвать функцию getVideos
		}

		if (this.props.filters.with_genres !== prevProps.filters.with_genres) {  //если текущая страница не равна предыдущей
			this.getVideos(this.props.filters, this.props.page);    //тогда вызвать функцию getVideos
		} 
	}                                                        //здесь доступны не nextProps, (так как рендер произошол) то обновленные пропсы уже записались в this.props

	render() {
		const { movies } = this.state;    //console.log('movies', movies);    //console.log('filters', this.props.filters);
		console.log("render");                               //сколько раз рендер произошол
		return (<>
			<h5>Облако популярных тегов:</h5>
			{this.SimpleCloud()}
			<h3>Рекомендуемые фильмы и сериалы:</h3>
			<VideoList movies={movies} />
			</>
		);
	}
};

