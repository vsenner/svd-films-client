import React, {useState} from 'react';
import './LoginPage.scss'
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import Loader from "../../components/UI/Loader/Loader";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";

const LOGIN = 'Login';

const LoginPage = ({submit, type}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useNavigate();

  const onSubmit = (e) => {
    e.preventDefault();
    setLoading(true)
    submit(email, password)
      .then((user) => router(`/user/${user.id}`))
      .catch(err => {
        setLoading(false)
        setError(err);
      });
  }

  if (loading) {
    return (
      <Loader/>
    )
  }

  return (
      <div className="login-page__background">
        <div className="inner-header flex">
          <div className="login-page">
            <form className="login" onSubmit={onSubmit}>
              <h1 className='login__title'>{type}</h1>
              <span className='login__label'>Email</span>
              <label className="login__input">
                <div className="login__icon">
                  <div className="faUser"/>
                </div>
                <Input
                    className="Input"
                    setValue={setEmail}
                    value={email}
                    type="email"
                    placeholder='Type your email'
                />
              </label>

              <span className='login__label'>Password</span>
              <label className="login__input">
                <div className="login__icon">
                  <div className="faLock"/>
                </div>
                <Input
                    className="Input"
                    setValue={setPassword}
                    value={password}
                    type="password"
                    placeholder='Type your password'
                />
              </label>
              {error ? <div className="login__error">{error}</div> : null}
              <Button className='login__btn'>
                {type}
              </Button>
              {type === LOGIN ?
                  <div className="login__sign-up">
                    Haven't got an account yet?
                    <div className="login__link">
                      <Link to={'/signup'}>Sign up</Link>
                    </div>
                  </div>
                  :
                  <div className="login__sign-up">
                    Already have an account?
                    <div className="login__link">
                      <Link to={'/login'}>Login</Link>
                    </div>
                  </div>
              }
            </form>
          </div>
        </div>


        <div>
          <svg className="waves" xmlns="http://www.w3.org/2000/svg" xlinkHref="http://www.w3.org/1999/xlink"
               viewBox="0 24 150 28" preserveAspectRatio="none">

            <defs>
              <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"/>
            </defs>

            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7"/>
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)"/>
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)"/>
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff"/>
            </g>
          </svg>

        </div>
      </div>
  );
};

export default LoginPage;