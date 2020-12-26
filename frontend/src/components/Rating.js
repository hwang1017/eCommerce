import PropTypes from 'prop-types';
import React from 'react';
import { Row } from 'react-bootstrap';

const Rating = ({ value, numReviews, color }) => {
  return (
    <div className='rating'>
      <Row>
        <span>
          <i
            style={{ color: color }}
            className={
              value >= 1
                ? 'fas fa-star'
                : value >= 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color: color }}
            className={
              value >= 2
                ? 'fas fa-star'
                : value >= 1.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color: color }}
            className={
              value >= 3
                ? 'fas fa-star'
                : value >= 2.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color: color }}
            className={
              value >= 4
                ? 'fas fa-star'
                : value >= 3.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
        <span>
          <i
            style={{ color: color }}
            className={
              value >= 5
                ? 'fas fa-star'
                : value >= 4.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      </Row>
    </div>
  );
};

Rating.defaultProps = {
  value: 0,
  numReviews: 0,
  color: '#f8e825',
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  numReviews: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default Rating;
