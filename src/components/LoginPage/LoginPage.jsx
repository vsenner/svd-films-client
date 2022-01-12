import React, {useState} from 'react';
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthController from "../../controllers/auth-controller";
import './LoginPage.scss'
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useNavigate();

  const login = async () => {
    try {
      const user = await AuthController.login(email, password);
      router(`/user/${user.id}`);
    } catch (err) {
      console.log(err.response?.data?.message)
    }
  }

  const authReducer = useSelector(store => store.authReducer);

  return (
    <div className='login-page'>
      {authReducer.isAuth ?
        <div className="login">
          <div className="login__title">
            You are already authorized!
          </div>
          <div className="login__link">
            <Link to={`/user/${authReducer.user.id}`}>Click here to return to the user page</Link>
          </div>
        </div>
        :
        <div className="login">
          <h1 className='login__title'>Login</h1>
          <span className='login__label'>Username</span>
          <label>
            <i className="far fa-user"/>
            <Input
              setValue={setEmail}
              value={email}
              type="text"
              placeholder='Type your username'
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
          <Button className='login__btn' onClick={login}>
            Login
          </Button>

          <div className="login__sign-up">
            Haven't got an account yet?
            <div className="login__link">
              <Link to={'/signup'}>Sign up</Link>
            </div>
          </div>
        </div>}

    </div>
  );
};

export default LoginPage;