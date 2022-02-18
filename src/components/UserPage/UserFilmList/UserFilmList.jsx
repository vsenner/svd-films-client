import React from 'react';
import './UserFilmList.scss'
import UserFilm from "./UserFilm";

const UserFilmList = ({films}) => {

  return (
    films?.length ?
      <div className="user__film-list">
        <div className="user__film-list-header">
          <div>№</div>
          <div>film</div>
          <div>date</div>
          {films[0].user_rating ? <div>my rating</div> : null}
        </div>
        <ul className='genres__film-list'>
          {films?.map((film, index) =>
            <UserFilm
              film={film}
              num={index + 1}
              id={film.id}
              key={film.id}/>
          )}
        </ul>
      </div>
      :
      ''
  );
};

export default UserFilmList;