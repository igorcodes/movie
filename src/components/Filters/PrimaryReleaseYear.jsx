import React from "react";

export default class PrimaryReleaseYear extends React.Component {
	render() {
		const {primary_release_year, onChangeFilters} = this.props;
		
		return (
			<div className="form-group">
			<label htmlFor="sort_by">Год релиза:  </label>
			<select 
			    value={primary_release_year} 
				onChange={onChangeFilters} 
				name="primary_release_year" 
				id="primary_release_year" 
				labeltext="Год релиза:">
					<option value="2021">2021</option>
			  		<option value="2020">2020</option>
			  		<option value="2019">2019</option>
			  		<option value="2018">2018</option>
			  		<option value="2017">2017</option>
			  		<option value="2016">2016</option>
			  		<option value="2015">2015</option>
			  		<option value="2014">2014</option>
			  		<option value="2013">2013</option>
			  		<option value="2012">2012</option>
			  		<option value="2011">2011</option>
			  		<option value="2010">2010</option>
			  		<option value="2009">2009</option>
			  		<option value="2008">2008</option>
			  		<option value="2007">2007</option>
			  </select>
			  </div>
		)
	}
}