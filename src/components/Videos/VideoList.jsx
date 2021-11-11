import React from "react";
import VideoItem from "./VideoItem";
import {API_URL, API_KEY_3} from "../../api/api";

export default class VideoList extends React.Component {
	constructor() {
		super();

		this.state = {
			movies: [] //это изменяемый массив, должен быть в стейте, изначально пустой без данных (пока не получили их с API), данные будеи получать в componentDidMount
		};
	}


									//в обоих ЖЦ componentWillReceiveProps и componentDidMount идентичные методы, чтобы не было дублирования создаю функцию и применю ее в обоих ЖЦ
	
	getVideos = (filters, page) => {  //аргумент filters буду пробрасывать в эту функцию
		const {sort_by, primary_release_year} = filters  //хочу sort_by брать с filters (аргумент с функции)
		
		const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}&page=${page}&primary_release_year=${primary_release_year}`;// Обращаемся к url, делаем фетч и получаем данные и после этого изменяем наше состояние; &language=ru-RU` - значит пришли мне данные на русском
		fetch(link)
			.then(response => { return response.json(); }) //получаем response и этот response мы преобразуем в обычный js-обьект с помощью json
			.then(data => { console.log('data', data); this.setState({ movies: data.results }); }); //data.results это наш массив фильмов, setStatом мы изменяем стейт и происходит рендер и в movies.map появляется массив из 20 элементов, мы его мапируем и 
	} 


	componentDidMount() { //этот МЖЦ срабатывает только 1 раз после первого рендера там где и нужно делать все наши ajax-запросы. 
		this.getVideos(this.props.filters, this.props.page);
																												/* 
								const { filters: { sort_by } } = this.props; // идентично const sort_by = this.props.filters.sort_by    деструктуризация (все данные в this.props), если этот ключ в обьекте есть то он запишет его в переменную sort_by 
								const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;// Обращаемся к url, делаем фетч и получаем данные и после этого изменяем наше состояние; &language=ru-RU` - значит пришли мне данные на русском
								fetch(link)
									.then(response => { return response.json(); }) //получаем response и этот response мы преобразуем в обычный js-обьект с помощью json
									.then(data => { console.log('data', data); this.setState({ movies: data.results }); }); //data.results это наш массив фильмов, setStatом мы изменяем стейт и происходит рендер и в movies.map появляется массив из 20 элементов, мы его мапируем и  */
	}

									/* Как происходит обновление компонета при изменении пропса
										componentWillReceiveProps
										shouldComponentUpdate
										componentWillUpdate
										render
										componentDidUpdate */

									// componentWillReceiveProps убрал потому что он не будет поддерживаться в следующих React  срабатывает перед рендером, имеем доступ к пропсам
									// если  sort_by поменялся то отправьте новый запрос с новым  sort_by (и уже новый  sort_by я беру у nextProps)
									/* componentWillReceiveProps(nextProps) {  //новый жизненный цикл компонента. обновление ЖЦ срабатывает когда обновляется компонент, либо пропс изменяется (тогда  componentWillReceiveProps) либо меняется стейт (тогда shouldComponentUpdate) 
										console.log("props1", this.props, "nextProps1", nextProps) //теперь нам просто нужно сравнить  this.props и nextProps, и если он пропс другой(изменился) то нужно отправить новый запрос с filters sort_buy
										if (nextProps.filters.sort_by !== this.props.filters.sort_by) {
											this.getVideos(nextProps.filters);
																																				
											// const { filters: { sort_by } } = nextProps; // идентично const sort_by = this.props.filters.sort_by    деструктуризация (все данные в this.props), если этот ключ в обьекте есть то он запишет его в переменную sort_by 
											// const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU&sort_by=${sort_by}`;// Обращаемся к url, делаем фетч и получаем данные и после этого изменяем наше состояние; &language=ru-RU` - значит пришли мне данные на русском
											// fetch(link)
											// 	.then(response => { return response.json(); }) //получаем response и этот response мы преобразуем в обычный js-обьект с помощью json
											// 	.then(data => { console.log('data', data); this.setState({ movies: data.results }); }); //data.results это наш массив фильмов, setStatом мы изменяем стейт и происходит рендер и в movies.map появляется массив из 20 элементов, мы его мапируем и  
										}
									} */
	
	componentDidUpdate(prevProps) {
		console.log("componentDidUpdate", 'какая была предыдущая страница ', prevProps.page, 'какая новая страница ', this.props.page); //особенность componentDidUpdate в том что тут уже все поменялось, рендер уже произошол, срабатывает после рендера, пропсы уже поменялись, имеем доступ к предыдущим пропсам 
		if (this.props.filters.sort_by !== prevProps.filters.sort_by) { //просто сравниваю фильтры, новый такой-же как и старый или нет
			this.props.onChangePage(1);  //изменяем состояние чтобы в app - page поменялся и стал 1 
			this.getVideos(this.props.filters, 1);  //если мы дошли до какой-то страницы и поменяли фильтр, тогда должно вызвать функцию с новым фильтром и ПЕРВОЙ СТРАНИЦЕЙ!!!! т.е. пагинация (переключение страниц) должна сбрасываться
		}

		if (this.props.filters.primary_release_year !== prevProps.filters.primary_release_year) { //просто сравниваю фильтры, новый такой-же как и старый или нет
			this.props.onChangePage(1);  //изменяем состояние чтобы в app - page поменялся и стал 1 
			this.getVideos(this.props.filters, 1);  //если мы дошли до какой-то страницы и поменяли фильтр, тогда должно вызвать функцию с новым фильтром и ПЕРВОЙ СТРАНИЦЕЙ!!!! т.е. пагинация (переключение страниц) должна сбрасываться
		}

		if (this.props.page !== prevProps.page) {  //если текущая страница не равна предыдущей
			this.getVideos(this.props.filters, this.props.page);    //тогда вызвать функцию getVideos
		}
	} //здесь доступны не nextProps, (так как рендер произошол) то обновленные пропсы уже записались в this.props

	render() {
		const { movies } = this.state;
		//console.log('movies', movies);
		//console.log('filters', this.props.filters);
		console.log("render"); //сколько раз рендер произошол
		return (
			<div className="row">
				{movies.map(movie => { //setStatом мы изменяем стейт и появляется массив из 20 элементов, мы его мапируем и превращаем в карточки
						return (
							<div key={movie.id} className="col-6 mb-4"> {/* изначально привязываем верхний див к кей для того чтобы потом что-то делать с этими узлами */}
								<VideoItem item={movie} /> {/* в VideoItem вкидываем как пропс наш обьект movie */}
							</div>
						);
				})}
			</div>
		);
	}
};

