import React from 'react';
import StarRatingComponent from 'react-star-rating-component';


class Rating extends React.Component {
    constructor() {
        super();

        this.state = {
            rating: 1
        };
    }

    onStarClick(nextValue, prevValue, name) {
        this.setState({rating: nextValue});
    }

    render() {
        const { rating } = this.state;

        return (
            <div>
                <h4>Мойличный рейтинг 2: {rating}</h4>
                <StarRatingComponent name="rate1" starCount={10} value={rating} onStarClick={this.onStarClick.bind(this)} />
            </div>
        );
    }
}

export default Rating;
