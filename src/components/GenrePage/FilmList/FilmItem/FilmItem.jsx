import React from 'react';
import './FilmItem.scss'
import {Link} from "react-router-dom";

const FilmItem = ({poster_path,original_title,name, type,id}) => {
  return (
    <Link to={`/${type}/${id}`} >
      <div className='film'>
        <img src = {'https://image.tmdb.org/t/p/w185/'+poster_path} alt={original_title}/>
        <p>{name}</p>
      </div>
    </Link>
  );
};

export default FilmItem;