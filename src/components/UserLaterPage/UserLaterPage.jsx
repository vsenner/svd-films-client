import React, {useEffect, useState} from 'react';
import MovieController from "../../controllers/movie.controller";
import {useParams} from "react-router-dom";
import UserFilmList from "../UserPage/UserFilmList/UserFilmList";
import UserController from "../../controllers/user-controller";

const UserLaterPage = () => {
  const [filmList, setFilmList] = useState(null)
  const [username, setUsername] = useState(null)

  const params = useParams();

  useEffect(() => {
    (async () => {
        setFilmList(await MovieController.getLater(params.id));
        setUsername((await UserController.getUserInfo(params.id)).username);
      }
    )();
  }, [params.id])

  return (
    <div className='list-page'>
      {filmList?.length ?
        <div className='list-page__container'>
          <h1 className='list-page__title'>{username}`s movies to watch later</h1>
          <UserFilmList
            films={filmList}
          />
        </div>
        :
        <h2 className='list-page__title'>{username} has no movies to watch later yet</h2>
      }
    </div>
  );
};

export default UserLaterPage;