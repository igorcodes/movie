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


	componentDidMount() { //этот МЖЦ срабатывает только 1 раз после первого рендера там где и нужно делать все наши ajax-запросы. 
		const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=ru-RU`;// Обращаемся к url, делаем фетч и получаем данные и после этого изменяем наше состояние; &language=ru-RU` - значит пришли мне данные на русском
		fetch(link)
			.then(response => { return response.json(); }) //получаем response и этот response мы преобразуем в обычный js-обьект с помощью json
			.then(data => { console.log('data', data); this.setState({ movies: data.results }); }); //data.results это наш массив фильмов, setStatом мы изменяем стейт и происходит рендер и в movies.map появляется массив из 20 элементов, мы его мапируем и 
	}
	

	render() {
		const { movies } = this.state;
		console.log('movies', movies);
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

