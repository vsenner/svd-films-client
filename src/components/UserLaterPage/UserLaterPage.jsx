import React, {useEffect, useState} from 'react';
import MovieController from "../../controllers/movie-controller";
import {useParams} from "react-router-dom";
import UserFilmList from "../UserPage/UserFilmList/UserFilmList";
import {useSort} from "../../hooks/useSort";
import UserController from "../../controllers/user-controller";

const ASCENDING = false;
const DESCENDING = true;

const UserLaterPage = () => {
  const [filmList, setFilmList] = useState(null)
  const [sortMethod, setSortMethod] = useState({field: null, method: DESCENDING});
  const [username, setUsername] = useState(null)


  const params = useParams();

  const sortedFilmList = useSort(filmList, sortMethod);


  useEffect(() => {
    MovieController.getLater(params.id).then(list => {
      setFilmList(list)
    })
    UserController.getUserInfo(params.id).then(user => {
      setUsername(user.username);
    })
  }, [params.id])

  const sortBy = (field) => {
    if (sortMethod.field === field) {
      return setSortMethod({...sortMethod, method: !sortMethod.method});
    }
    return setSortMethod({field, method: DESCENDING});
  }

  return (
    <div className='list-page'>
      {filmList?.length ?
        <div className='list-page__container'>
          <h1 className='list-page__title'>{username}`s movies to watch later</h1>
          <div className="list-page__sort">
            <div className="list-page__sort-by">
              Sort by:
            </div>
            <button className="list-page__sort-item" onClick={() => sortBy('time')}>
              date
            </button>
            <button className="list-page__sort-item" onClick={() => sortBy('title')}>
              film name
            </button>
            <button className="list-page__sort-item" onClick={() => sortBy('year')}>
              year
            </button>
            <button className="list-page__sort-item" onClick={() => sortBy('rating')}>
              tmdb rating
            </button>
          </div>
          <UserFilmList
            films={sortedFilmList}
          />
        </div>
        :
        <h2 className='list-page__title'>{username} has no movies to watch later yet</h2>
      }
    </div>
  );
};

export default UserLaterPage;