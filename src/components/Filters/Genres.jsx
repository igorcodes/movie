import React from "react";

export default class Genres extends React.Component {
	render() {
		const {with_genres, onChangeFilters} = this.props;
		return (
			<div className="form-group">
			  <label htmlFor="with_genres">Жанры:</label>
			  <p><input type="checkbox" value="with_genre">Комедия</input></p>
			  <p><input type="checkbox" value="with_genre">Детектив</input></p>
			  <p><input type="checkbox" value="with_genre">Ужасы</input></p>
			  <p><input type="checkbox" value="with_genre">Драма</input></p>
			  <p><input type="checkbox" value="with_genre">Мистика</input></p>
			  <p><input type="checkbox" value="with_genre">Исторические</input></p>
			  <p><input type="checkbox" value="with_genre">Другие</input></p>
			  <select 
			    className="form-control" 
				value={with_genres} 
				onChange={onChangeFilters} 
				name="with_genres" 
				id="with_genres">
				   <option value="popularity.desc">Популярные по убыванию</option>
			  		<option value="popularity.asc">Популярные по возрастанию</option>
			  		<option value="vote_average.desc">Рейтинг по убыванию</option>
			  		<option value="vote_average.asc">Рейтинг по возрастанию</option>
			  		<option value="vote_count.desc">Количество проголосовавших по убыванию</option>
			  		<option value="vote_count.asc">Количество проголосовавших по возрастанию</option>
			  		<option value="revenue.desc">Прибыль по убыванию</option>
			  		<option value="revenue.asc">Прибыль по возрастанию</option>
			  </select>
		  </div>
		)
	}
}