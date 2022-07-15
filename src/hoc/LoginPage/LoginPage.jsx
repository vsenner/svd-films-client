import React, {useEffect, useState} from 'react';
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

  useEffect(() => {
    document.title = `${process.env.REACT_APP_PROJECT_NAME} - ${type}`
    return () => document.title = process.env.REACT_APP_PROJECT_NAME;
  }, [type])

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
    <div className='login-page'>
      <form className="login" onSubmit={onSubmit}>
        <h1 className='login__title'>{type}</h1>
        <span className='login__label'>Email</span>
        <label>
          <i className="far fa-user"/>
          <Input
            setValue={setEmail}
            value={email}
            type="email"
            placeholder='Type your email'
          />
        </label>

        <span className='login__label'>Password</span>
        <label>
          <i className="fas fa-lock"/>
          <Input
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
  );
};

export default LoginPage;