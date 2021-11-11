import React from "react";

export default class SortBy extends React.Component {
	render() {
		const {sort_by, onChangeFilters} = this.props;
		return (
			<div className="form-group">
			  <label htmlFor="sort_by">Сортировать по:</label>
			  <select 
			    className="form-control" 
				value={sort_by} 
				onChange={onChangeFilters} 
				name="sort_by" 
				id="sort_by">
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