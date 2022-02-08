import React from 'react';
import './FilmItem.scss'

const FilmItem = (props) => {
  return (
    <div className='film'>
      <img src = {'https://image.tmdb.org/t/p/w185/'+props.poster_path} alt={props.original_title}/>
      <p>{props.film_name}</p>
    </div>
  );
};

export default FilmItem;