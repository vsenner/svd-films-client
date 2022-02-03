import React from 'react';
import {Link} from "react-router-dom";

const UserFilm = ({film, num, id}) => {
  const filmTime = new Date(film.time);
  const year = (new Date(film.year)).getFullYear();
  return (
      <Link to={`/film/${id}`} className='film-list__item'>
        <div className='film-list__number'>{num}</div>
        <div
          className='film-list__title'>{film.title} ({year})</div>
        <div className='film-list__date'>{filmTime.toLocaleDateString().replace(/(\/)/g , '.')}</div>
        {film.user_rating ? <div className='film-list__rating'>{film.user_rating}</div> : null}
      </Link>
  );
};

export default UserFilm;