import React from 'react';
import './MediaItem.scss'
import {Link} from "react-router-dom";
import placeholder from '../../../../images/no-poster.png'
import {getSmallImage} from "../../../../UI/getSmallImage";


const MediaItem = ({poster_path, original_title, name, type, id, year}) => {
  const poster = poster_path ? getSmallImage(poster_path) : placeholder;
  return (
    <Link to={`/${type}/${id}/overview`} >
      <div className='media-list__item media-item'>
        <div className="media-item__img">
          <img src ={poster} alt={original_title}/>
          <div className="media-item__hover"/>
        </div>
        <p className='media-item__name'>{name}</p>
        <p className="media-item__description">{year}</p>
      </div>
    </Link>
  );
};

export default MediaItem;