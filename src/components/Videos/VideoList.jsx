import React from "react";
import VideoItem from "./VideoItem";
import PropTypes from "prop-types";


const VideoList = ({ movies = [] }) => (    //деструктуризация пропсов VideoList, можно было тут просто написать props, а ниже props.movies
	<div className="row">
				{movies.map(movie => {                       //setStatом мы изменяем стейт и появляется массив из 20 элементов, мы его мапируем и превращаем в карточки
						return (
							<div key={movie.id} className="col-6 mb-4">      {/* изначально привязываем верхний див к кей для того чтобы потом что-то делать с этими узлами */}
								<VideoItem item={movie} />                   {/* в VideoItem вкидываем как пропс наш обьект movie */}
							</div>
						);
				})}
	</div>
);

VideoList.propTypes = { movies: PropTypes.array.isRequired }  // указываю что movies это точно array, чтобы я не ошибился передавая не массив. Когда делаем глупые колмпоненты нужно делать PropTypes.

export default VideoList;

