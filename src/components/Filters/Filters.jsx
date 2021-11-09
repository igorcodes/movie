import React from "react";

export default class Filters extends React.Component {
  render() {
    return (
      <div className="mb-3">
		  <div className="form-group">
			  <label htmlFor="sort_by">Сортировать по:</label>

			  <select className="form-control" id="sort_by">
				   <option value="popularity.desc">Популярные по убыванию</option>
			  		<option value="popularity.asc">Популярные по возрастанию</option>
			  		<option value="vote_average.desc">Рейтинг по убыванию</option>
			  		<option value="vote_average.asc">Рейтинг по убыванию</option>
			  </select>
		  
		  </div>
	  </div>
    );
  }
}