import React, {useMemo, useState} from 'react';
import './Rate.scss'
import Star from "./Star/Star";

const Rate = ({avgRating, action}) => {
  const [ratingActive, setRatingActive] = useState({
    width: avgRating * 10,
    color: '#ffd300',
  })

  const stars = useMemo(() => {
    return [...new Array(10)].map((_, i) =>
      <Star
        onClick={() => action(i+1)}
        key={i}
        type="radio"
        className="rating__item"
        value={i} name="rating"
        onMouseEnter={() => {
          setRatingActive({color: 'cyan', width: (i + 1) * 10});
        }}
      />)
  }, [action])

  const mouseLeaveHandler = () => {
    setRatingActive({color: '#ffd300', width: avgRating * 10})
  }

  return (
    <form className='rating-form'>
      <div className="rating">
        <div className="rating__body">
          <div className="rating__active" style={{width: `${ratingActive.width}%`, color: ratingActive.color}}/>
          <div className="rating__items" onMouseLeave={mouseLeaveHandler}>
            {stars}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Rate;