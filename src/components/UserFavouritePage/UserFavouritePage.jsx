import React, {useEffect, useState} from 'react';
import UserFilmList from "../UserPage/UserFilmList/UserFilmList";
import MovieController from "../../controllers/movie-controller";
import {useParams} from "react-router-dom";
import {useSort} from "../../hooks/useSort";
import {useSelector} from "react-redux";

const ASCENDING = false;
const DESCENDING = true;

const UserFavouritePage = () => {
  const [filmList, setFilmList] = useState(null)
  const [sortMethod, setSortMethod] = useState({field: null, method: DESCENDING});

  const params = useParams();

  const sortedFilmList = useSort(filmList, sortMethod);

  const username = useSelector(state => state.user.username);

  useEffect(() => {
    MovieController.getFavourite(params.id).then(list => {
      setFilmList(list)
    })
  }, [params.id])

  const sortBy = (field) => {
    if(sortMethod.field === field) {
      return setSortMethod({...sortMethod, method: !sortMethod.method});
    }
    return setSortMethod({field, method: DESCENDING});
  }

  return (
    <div className='list-page'>
      {filmList?.length ?
        <div className='list-page__container'>
          <h1 className='list-page__title'>{username}`s favourite movies</h1>
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
        <h2 className='list-page__title'>{username} has no favourite movies yet</h2>
      }
    </div>
  );
};

export default UserFavouritePage;