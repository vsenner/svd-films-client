import React from 'react';
import './FilmItem.scss'
import {Link} from "react-router-dom";

const FilmItem = ({poster, film_name, film_id, film_type}) => {
  return (
    <Link className='genres__film' to={`/${film_type}/${film_id}`}>
      <img src = {poster} alt={film_name}/>
      <p>{film_name}</p>
    </Link>
  );
};

export default FilmItem;