import React from 'react';
import './MediaItem.scss'
import {Link} from "react-router-dom";
import {getSmallImage} from "../../../../utils";

const NO_POSTER_PATH = 'https://i.ibb.co/nj8KNJv/no-poster.png'


const MediaItem = ({poster_path, original_title, name, type, id, year}) => {
  return (
    <Link to={`/${type}/${id}/overview`} >
      <div className='media-list__item media-item'>
        <div className="media-item__img">
          <img src = {poster_path ? getSmallImage(poster_path) : NO_POSTER_PATH} alt={original_title}/>
          <div className="media-item__hover"/>
        </div>
        <p className='media-item__name'>{name}</p>
        <p className="media-item__description">{year}</p>
      </div>
    </Link>
  );
};

export default MediaItem;