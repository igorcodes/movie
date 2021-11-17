import React from "react";
import {API_URL, API_KEY_3} from "../../api/api";


export default class Genres extends React.Component {
	constructor() {
		super();

		this.state = {
			genresList: []                              //это изменяемый массив, должен быть в стейте, изначально пустой без данных (пока не получили их с API), данные будеи получать в componentDidMount
		};
	}
	
	componentDidMount() { 
		const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
		fetch(link)
			.then(response => { return response.json(); }) //получаем response и этот response мы преобразуем в обычный js-обьект с помощью json
			.then(data => { this.setState({ genresList: data.genres }); }); //data.results это наш массив фильмов, setStatом мы изменяем стейт и происходит рендер и в movies.map появляется массив из 20 элементов, мы его мапируем и
	}
								
	onChange = event => {
		const { with_genres = [] } = this.props;
      const check = event.target.checked;
      const value = event.target.value;
      this.props.onChangeFilters({
        target: {
          name: "with_genres",
          value: check
            ? [...with_genres, value]
            : with_genres.filter(genre => Number(genre) !== Number(value))
        }
      });
    };

	resetGenres = () => {
		this.props.onChangeFilters({
			target: {
				name: "with_genres",
				value: []
			}
		});
	};
                                                  

	render() {
		const { genresList } = this.state;
		const { with_genres = [] } = this.props;
		return (

			<React.Fragment>
			<div>
			<button type="button" className="btn btn-outline-dark mb-2" onClick={this.resetGenres} >Показать все жанры</button>
			</div>

			{genresList.map(genre => (
				<div key={genre.id} className="form-check">
					<input
					className="form-check-input"
					type="checkbox"
					value={genre.id} 
					id={`genre${genre.id}`}
					onChange={this.onChange}
					checked={with_genres.includes(String(genre.id))}
					/>
					<label className="form-check-label" htmlFor={`genre${genre.id}`} >{genre.name}</label>
				</div>
			))};
			
			</React.Fragment>
		);
	}
}

