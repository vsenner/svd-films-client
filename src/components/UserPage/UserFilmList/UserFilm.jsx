import React from 'react';
import {Link} from "react-router-dom";

const UserFilm = ({film, num, id}) => {
  const filmTime = new Date(film.time);
  console.log(film)
  return (
    <li className='film-list__item'>
      <div className='film-list__number'>{num}</div>
      <Link
        to={`/film/${id}`}
        className='film-list__title'>{film.title}</Link>
      <div className='film-list__date'>{filmTime.toLocaleDateString().replace(/(\/)/g , '.')}</div>
      <div className='film-list__rating'>{film.rating}</div>
    </li>
  );
};

export default UserFilm;