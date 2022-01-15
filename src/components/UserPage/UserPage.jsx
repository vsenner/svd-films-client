import React, {useEffect, useState} from 'react';
import './UserPage.scss'
import Button from "../UI/Button/Button";
import AuthController from "../../controllers/auth-controller";
import {useNavigate} from "react-router";
import MovieController from "../../controllers/movie.controller";
import {useParams} from "react-router-dom";
import UserFilmList from "./UserFilmList/UserFilmList";
import UserController from "../../controllers/user-controller";

const placeholderURL = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0='

const UserPage = () => {
  const [user, setUser] = useState({})
  const [filmList, setFilmList] = useState(null)

  const router = useNavigate()
  const params = useParams()

  useEffect( () => {
    (async () => {
      setUser(await UserController.getUserInfo(params.id))
    })()
  }, [params.id])

  const logout = async () => {
    await AuthController.logout();
    router('/');
  }

  return (
    <div className='user-page'>
      <div className="container">
        <div className="user">
          <div className="user__row">
            <div className="user__img">
              <img src={placeholderURL} alt=""/>
            </div>
            <div className="user__info">
              <h1 className="user__name">
                {user?.username}
              </h1>
            </div>
          </div>
          <div className="films-header">
            <button
              onClick={async () => setFilmList(await MovieController.getRated(params.id))}
              className="films-header__item"
            >
              <div>{user?.listsLength?.rated}</div>
              films
            </button>
            <button
              className="films-header__item"
              onClick={async () => setFilmList(await MovieController.getFavourite(params.id))}
            >
              <div>{user?.listsLength?.favourite}</div>
              favourite films
            </button>
            <button
              className="films-header__item"
              onClick={async () => setFilmList(await MovieController.getLater(params.id))}
            >
              <div>{user?.listsLength?.later}</div>
              watch later
            </button>
          </div>
          {filmList ? <UserFilmList films={filmList}/> : null}
          <Button onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;