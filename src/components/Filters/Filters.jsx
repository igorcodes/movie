import React from "react";
import Genres from './Genres';
import PrimaryReleaseYear from './PrimaryReleaseYear';
import SortBy from "./SortBy";
import Search from "./Search"; 

export default class Filters extends React.Component {
  render() {
	  const { filters: {sort_by, primary_release_year,  with_genres, search }, page, onChangeFilters, onChangePage } = this.props; //чтобы в зависимости от того какое состояние в app.js, был такой-же селект
    return (
      <form className="mb-3">
		  <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} /><br/>
		  <PrimaryReleaseYear primary_release_year={primary_release_year} onChangeFilters={onChangeFilters} /><br/>

		  <Search search={search} onChangeFilters={onChangeFilters} /><br/>
		  
		  <Genres with_genres={with_genres}   onChangeFilters={onChangeFilters} /><br/>

		  <div className="btn-group">
			<button type="button" className="btn btn-secondary" onClick={onChangePage.bind(null, page - 1)} disabled={page === 1}>Предыдущая</button>  {/* onClick={onChangePage.bind(null, page - 1)} в bind передаем null и первый аргумент page - 1 */}
			<button type="button" className="btn btn-secondary" onClick={onChangePage.bind(null, page + 1)}>Следующая</button>  {/* onClick={() => {onChangePage(page + 1);}} при онклике вызываем функцию в которой будем вызывать onChangePage с параметром page + 1*/}
		  </div>
		  
		  
		  
	  </form>
    );
  }
}