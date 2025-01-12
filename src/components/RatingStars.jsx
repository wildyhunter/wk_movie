import { FaStar } from 'react-icons/fa';
import PropTypes from 'prop-types';

const RatingStars = ({ rating }) => {

    const stars = Math.round(rating / 2);

    const getStarColor = (index) => {
        if (index < stars) {
            if (rating >= 8) return '#FFD700';
            if (rating >= 7) return '#FFA500';
            return '#FF4500';
        }
        return '#ccc';
    };

    return (
        <div>
            {[...Array(5)].map((_, index) => (
                <FaStar
                    key={index}
                    size={24}
                    color={getStarColor(index)}
                    style={{ marginRight: '4px' }}
                />
            ))}
        </div>
    );
};

RatingStars.propTypes = {
    rating: PropTypes.number.isRequired
}

export default RatingStars;
