import React from 'react';
import './UserMediaList.scss'
import UserMediaItem from "./UserMediaItem";

const UserMediaList = ({list, media_type}) => {

  console.log(list)

  return (
    list?.length ?
      <div className="user__film-list">
        <div className="user__film-list-header">
          <div>№</div>
          <div>name</div>
          <div>date</div>
          <div>tmdb rating</div>
          {list[0].user_rating ? <div>my rating</div> : null}
        </div>
        <ul className='film-list'>
          {list?.map((media_item, index) =>
            <UserMediaItem
              media_item={media_item}
              type={media_type}
              num={index + 1}
              id={media_item.id}
              key={media_item.id}/>
          )}
        </ul>
      </div>
      :
      ''
  );
};

export default UserMediaList;