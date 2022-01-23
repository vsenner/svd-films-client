import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import MovieController from "../../controllers/movie-controller";
import UserFilmList from "../UserPage/UserFilmList/UserFilmList";
import UserController from "../../controllers/user-controller";

const UserRatedPage = () => {
  const [filmList, setFilmList] = useState(null)
  const [username, setUsername] = useState(null)

  const params = useParams();

  useEffect(() => {
    MovieController.getRated(params.id).then(list => {
      setFilmList(list)
    })

    UserController.getUserInfo(params.id).then(user => {
      setUsername(user.username)
    })
  }, [params.id])

  return (
    <div className='list-page'>
      {filmList?.length ?
        <div className='list-page__container'>
          <h1 className='list-page__title'>{username}`s watched movies</h1>
          <UserFilmList
            films={filmList}
          />
        </div>
        :
        <h2 className='list-page__title'>{username} has no rated movies yet</h2>
      }
    </div>
  );
};

export default UserRatedPage;