import React from "react";

export default class Search extends React.Component {
	render() {
		const {search, onChangeFilters} = this.props;

		/* const handleKey = (event) => {
        if (event.key === 'Enter') {
            this.props.searchFilm(this.state.search, this.state.type); 
        }
    	} */
		
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