import React from "react";
import VideoItem from "./VideoItem";
import PropTypes from "prop-types";


const VideoList = ({ movies = [] }) => (   
	<div className="row">
				{movies.map(movie => {                      
						return (
							<div key={movie.id} className="col-6 mb-4">     
								<VideoItem item={movie} />                   
							</div>
						);
				})}
	</div>
);

VideoList.propTypes = { movies: PropTypes.array.isRequired }  // movies это точно array

export default VideoList;

