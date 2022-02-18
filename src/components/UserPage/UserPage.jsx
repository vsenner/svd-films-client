import React, {useEffect, useRef, useState} from 'react';
import './UserPage.scss'
import Button from "../UI/Button/Button";
import AuthController from "../../controllers/auth-controller";
import {useNavigate} from "react-router";
import {Link, useParams} from "react-router-dom";
import UserController from "../../controllers/user-controller";
import {useDispatch, useSelector} from "react-redux";


const placeholderURL = 'https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=';

const BASE64 = 'data:image/jpg;base64'

const UserPage = () => {
  const [user, setUser] = useState({})
  const [editing, setEditing] = useState(false)
  const [usernameInput, setUsernameInput] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState('')

  const router = useNavigate()
  const params = useParams()

  useEffect(() => {
    UserController.getUserInfo(params.id).then(userData => {
      setUser(userData);
      setUsernameInput(userData.username);
    }).catch(err => console.log('UserPage 25 - ', err));

    UserController.getUserImage(params.id).then(img => {
      setImage(img ? `${BASE64}, ${img}` : null);
    })
  }, [params.id])

  const logout = async () => {
    await AuthController.logout();
    router('/');
  }

  const dispatch = useDispatch();

  const changeUsername = async (e) => {
    e.preventDefault();
    if (photo.current?.files.length) {
      if (photo.current.files[0].size > 2000000) {
        setError('Photo must be smaller than 2MB.')
        return;
      }
      await UserController.changeUserImage(photo.current.files[0], params.id);
      UserController.getUserImage(params.id).then(img => {
        setImage(img ? `${BASE64}, ${img}` : placeholderURL);
        dispatch({type: 'CHANGE_USER', payload: {compressedImage: img}})
      })
    }

    if (usernameInput !== user.username) {
      try {
        await UserController.changeUsername(usernameInput, params.id);
      } catch (err) {
        setError(err);
        username.current?.focus();
        return;
      }
      setUser(prev => ({...prev, username: usernameInput}));
    }

    if (error) {
      setError(null);
    }
    setEditing(false);
  }

  const username = useRef();
  const photo = useRef();

  const loggedUser = useSelector(state => state.user)

  return (
    <div className='user-page'>
      <div className="container">
        <div className="user">
          <form
            onSubmit={changeUsername}
          >
            <div className="user__row">
              <input
                accept='image/*'
                type="file"
                id='user__file'
                ref={photo}
              />
              {editing ?
                <label htmlFor='user__file' className={`user__img ${editing ? 'editing' : ''}`}>
                  <img src={image} alt=""/>
                </label>
                :
                <div className={`user__img ${editing ? 'editing' : ''}`}>
                  <img src={image} alt=""/>
                </div>
              }
              <div className="user__info">
                <div className="user__header">
                  {editing ?
                    <div className='username__input'>
                      <input
                        ref={username}
                        onChange={e => setUsernameInput(e.target.value)}
                        value={usernameInput}
                        className={`user__name ${editing ? 'editing' : ''}`}
                      />
                      <span className='username__error'>{error}</span>
                    </div>
                    :
                    <h1 className='user__name'>
                      {user?.username}
                    </h1>
                  }
                  {
                    +params.id === loggedUser.id ?
                      <Button
                        type='button'
                        onClick={(e) => {
                          if (editing) {
                            changeUsername(e);
                          } else {
                            setEditing(!editing)
                          }
                        }}
                        className='user__edit-btn'
                      >
                        {
                          editing ?
                            <div>
                              <i className="fas fa-edit"/>
                              Submit
                            </div>
                            :
                            <div>
                              <i className="fas fa-edit"/>
                              Edit
                            </div>
                        }
                      </Button>
                      :
                      null
                  }
                </div>
              </div>
            </div>
          </form>
          <div className="films-header">
            <Link
              to={`/user/${params.id}/rated`}
              className="films-header__item"
            >
              <div>{user?.listsLength?.rated}</div>
              films
            </Link>
            <Link
              className="films-header__item"
              to={`/user/${params.id}/favourites`}
            >
              <div>{user?.listsLength?.favourite}</div>
              favourite films
            </Link>
            <Link
              to={`/user/${params.id}/later`}
              className="films-header__item"
            >
              <div>{user?.listsLength?.later}</div>
              watch later
            </Link>
          </div>
          {
            +params.id === loggedUser.id ?
              <Button onClick={logout} className='logout__btn'>
                Logout
              </Button>
              :
              null
          }
        </div>
      </div>
    </div>
  );
};

export default UserPage;