import React from 'react';
import './FilmItem.scss'

const FilmItem = ({poster_path,original_title,film_name}) => {
  return (
    <div className='film'>
      <img src = {'https://image.tmdb.org/t/p/w185/'+poster_path} alt={original_title}/>
      <p>{film_name}</p>
    </div>
  );
};

export default FilmItem;