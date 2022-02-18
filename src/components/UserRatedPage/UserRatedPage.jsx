import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import MovieController from "../../controllers/movie-controller";
import UserFilmList from "../UserPage/UserFilmList/UserFilmList";
import {useSortAndFilter} from "../../hooks/useSort";
import UserController from "../../controllers/user-controller";

const ASCENDING = false;
const DESCENDING = true;

const UserRatedPage = () => {
  const [filmList, setFilmList] = useState(null)
  const [sortMethod, setSortMethod] = useState({field: null, method: DESCENDING});
  const [filterMethod, setFilterMethod] = useState(null)
  const [username, setUsername] = useState(null)

  const params = useParams();

  const sortedAndFilteredFilmList = useSortAndFilter(filmList, sortMethod, filterMethod);

  useEffect(() => {
    MovieController.getRated(params.id).then(list => {
      setFilmList(list)
    })
    UserController.getUserInfo(params.id).then(user => {
      setUsername(user.username);
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
          <h1 className='list-page__title'>{username}`s watched movies</h1>
          <div className="list-page__sort">
            <div className="list-page__sort-by">
              Sort by:
            </div>
            <button className="list-page__sort-item" onClick={() => sortBy('time')}>
              date
            </button>
            <button className="list-page__sort-item" onClick={() => sortBy('user_rating')}>
              my rating
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
          <div className="list-page__sort">
            <div className="list-page__sort-by">
              Show:
            </div>
            <button className="list-page__sort-item" onClick={() => setFilterMethod(null)}>
              all ratings
            </button>
            <button className="list-page__sort-item" onClick={() => setFilterMethod(10)}>
              10
            </button>
            <button className="list-page__sort-item" onClick={() => setFilterMethod(9)}>
              9
            </button>
            <button className="list-page__sort-item" onClick={() => setFilterMethod(8)}>
              8
            </button>
            <button className="list-page__sort-item" onClick={() => setFilterMethod(7)}>
              7
            </button>
            <button className="list-page__sort-item" onClick={() => setFilterMethod(6)}>
              6
            </button>
            <button className="list-page__sort-item" onClick={() => setFilterMethod(5)}>
              5
            </button>
            <button className="list-page__sort-item" onClick={() => setFilterMethod(4)}>
              4
            </button>
            <button className="list-page__sort-item" onClick={() => setFilterMethod(3)}>
              3
            </button>
            <button className="list-page__sort-item" onClick={() => setFilterMethod(2)}>
              2
            </button>
            <button className="list-page__sort-item" onClick={() => setFilterMethod(1)}>
              1
            </button>
          </div>
          <UserFilmList
            films={sortedAndFilteredFilmList}
          />
        </div>
        :
        <h2 className='list-page__title'>{username} has no rated movies yet</h2>
      }
    </div>
  );
};

export default UserRatedPage;