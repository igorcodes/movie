import React from "react";

export default class Search extends React.Component {
	
	render() {
		const {search, onChangeFilters} = this.props;
		
		return (
			<div className="form-group">
				<div className="input-field">
					<input 
					value={search} 
					onChange={onChangeFilters} 
					placeholder="ПОИСК"
					name="search" 
					id="search" 
					/>
				</div>
			  </div>
		)
	}
}

