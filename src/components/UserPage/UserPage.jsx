import React from 'react';
import './UserPage.scss'
import {useSelector} from "react-redux";
import Button from "../UI/Button/Button";
import AuthController from "../../controllers/auth-controller";
import {useNavigate} from "react-router";

const UserPage = () => {
  const authReducer = useSelector(store => store.authReducer);
  console.log(authReducer)
  const router = useNavigate()

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
              <img src="" alt=""/>
            </div>
            <div className="user__info">
              <h1 className="user__name">
                Hello {authReducer.user.username}!
              </h1>
              <div className="user__stats">

              </div>
            </div>
          </div>
          <Button onClick={logout}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;