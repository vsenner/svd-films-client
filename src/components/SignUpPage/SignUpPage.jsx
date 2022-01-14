import React, {useState} from 'react';
import './SignUpPage.scss'
import {Link} from "react-router-dom";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import {useSelector} from "react-redux";
import AuthController from "../../controllers/auth-controller";
import {useNavigate} from "react-router";
import Loader from "../UI/Loader/Loader";


const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)

  const authReducer = useSelector(store => store.authReducer);

  const router = useNavigate()

  const register = async () => {
    try {
      const user = await AuthController.registration(email, password);
      router(`/user/${user.id}`);
    } catch (err) {
      setError(err)
    }
  }

  return (
    <div className='login-page'>
      {authReducer.isLoading ?
        <Loader/>
        :
        authReducer.isAuth ?
          <div className="login">
            <div className="login__title">
              You are already authorized!
            </div>
            <div className="login__link">
              <Link to={`/user/${authReducer.user.id}`}>Click here to return to the user page</Link>
            </div>
          </div>
          :
          <form className="login">
            <h1 className='login__title'>Sign up</h1>
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
            {error ? <div className="login__error">{error}</div> : null}
            <Button className='login__btn' onClick={register}>
              Sign up
            </Button>

            <div className="login__sign-up">
              Already have an account?
              <div className="login__link">
                <Link to={'/login'}>Log in</Link>
              </div>
            </div>
          </form>}

    </div>
  );
};

export default SignUpPage;