import React from "react";
import Genres from './Genres';
import PrimaryReleaseYear from './PrimaryReleaseYear';
import SortBy from "./SortBy";

export default class Filters extends React.Component {
  render() {
	  const { filters: {sort_by, primary_release_year, with_genres }, page, /* total_pages, */ onChangeFilters, onChangePage } = this.props; //чтобы в зависимости от того какое состояние в app.js, был такой-же селект
    return (
      <form className="mb-3">
		  <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters} /><br/>
		  <PrimaryReleaseYear primary_release_year={primary_release_year} onChangeFilters={onChangeFilters} /><br/>
		  
		  <Genres genres={with_genres} onChange={onChangeFilters} /><br/>

		  <div className="btn-group">
			<button type="button" className="btn btn-secondary" onClick={onChangePage.bind(null, page - 1)} disabled={page === 1}>Предыдущая</button>  {/* onClick={onChangePage.bind(null, page - 1)} в bind передаем null и первый аргумент page - 1 */}
			<button type="button" className="btn btn-secondary" onClick={onChangePage.bind(null, page + 1)}>Следующая</button>  {/* onClick={() => {onChangePage(page + 1);}} при онклике вызываем функцию в которой будем вызывать onChangePage с параметром page + 1*/}
		  </div>

						{/* <div className="form-group">
							<label htmlFor="sort_by">Год релиза:</label>
							<select 
								value={primary_release_year} 
								onChange={onChangeFilters} 
								name="primary_release_year" 
								id="primary_release_year" 
								labelText="Год релиза:">
									<option value="2021">2021</option>
									<option value="2020">2020</option>
									<option value="2019">2019</option>
									<option value="2018">2018</option>
									<option value="2017">2017</option>
							</select>
						</div> */}
		  
		  
		  {/* <Pagination page={page} total_pages={total_pages} onChangePagination={onChangePagination} /> */}
		  
	  </form>
    );
  }
}