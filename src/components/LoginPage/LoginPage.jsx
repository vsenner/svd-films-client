import React, {useState} from 'react';
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthController from "../../controllers/auth-controller";
import './LoginPage.scss'
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import Loader from "../UI/Loader/Loader";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useNavigate();

  const login = (e) => {
    e.preventDefault();
    setLoading(true)
    AuthController.login(email, password).then(user => {
      router(`/user/${user.id}`);
    }).catch(err => {
      setError(err);
    }).finally(() => {
      setLoading(false)
    })
  }

  if (loading) {
    return (
      <Loader/>
    )
  }

  return (
    <div className='login-page'>
        <form className="login">
          <h1 className='login__title'>Login</h1>
          <span className='login__label'>Email</span>
          <label>
            <i className="far fa-user"/>
            <Input
              setValue={setEmail}
              value={email}
              type="text"
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
          <Button className='login__btn' onClick={login}>
            Login
          </Button>
          <div className="login__sign-up">
            Haven't got an account yet?
            <div className="login__link">
              <Link to={'/signup'}>Sign up</Link>
            </div>
          </div>
        </form>
    </div>
  );
};

export default LoginPage;