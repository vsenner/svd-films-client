import React, {useState} from 'react';
import {Link} from "react-router-dom";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import AuthController from "../../controllers/auth-controller";
import {useNavigate} from "react-router";
import Loader from "../UI/Loader/Loader";


const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const router = useNavigate()

  const register = () => {
    setLoading(true)
    AuthController.registration(email, password).then(user => {
      router(`/user/${user.id}`)
    }).catch(err => {
      setError(err)
    }).finally(() => {
      setLoading(false)
    });
  }

  return (
    <div className='login-page'>
      {loading ?
        <Loader/>
        :
        <form className="login">
          <h1 className='login__title'>Sign up</h1>
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