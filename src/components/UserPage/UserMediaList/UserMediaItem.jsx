import React from 'react';
import {Link} from "react-router-dom";

const UserMediaItem = ({media_item, num, id, type}) => {
  const mediaTime = new Date(media_item.time);
  return (
    <Link to={`/${type === 'tv' ? 'tv' : 'movie'}/${id}/1`} className='film-list__item'>
      <div className='film-list__number'>{num}</div>
      <div className='film-list__title'>
        {media_item.title} ({media_item.year})
      </div>
      <div className='film-list__date'>
        {mediaTime.toLocaleDateString().replace(/(\/)/g, '.')}
      </div>
      <div className='film-list__rating'>{media_item.rating}</div>
      {media_item.user_rating ?
        <div className='film-list__rating'>{media_item.user_rating}</div>
        :
        null
      }
    </Link>
  );
};

export default UserMediaItem;