import React, {useEffect, useState} from 'react';
import UserFilmList from "../UserPage/UserFilmList/UserFilmList";
import MovieController from "../../controllers/movie.controller";
import {useParams} from "react-router-dom";
import UserController from "../../controllers/user-controller";

const UserFavouritePage = () => {
  const [filmList, setFilmList] = useState(null)
  const [username, setUsername] = useState(null)

  const params = useParams();

  useEffect(() => {
    (async () => {
        setFilmList(await MovieController.getFavourite(params.id));
        setUsername((await UserController.getUserInfo(params.id)).username);
      }
    )();
  }, [params.id])


  return (
    <div className='list-page'>
      {filmList?.length ?
        <div className='list-page__container'>
          <h1 className='list-page__title'>{username}`s favourite movies</h1>
          <UserFilmList
            films={filmList}
          />
        </div>

        :
        <h2 className='list-page__title'>{username} has no favourite movies yet</h2>
      }
    </div>
  );
};

export default UserFavouritePage;