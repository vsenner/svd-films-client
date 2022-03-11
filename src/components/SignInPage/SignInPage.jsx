import React from 'react';
import LoginPage from "../../hoc/LoginPage/LoginPage";
import AuthController from "../../controllers/auth-controller";


const SignInPage = () => {
  return (
    <LoginPage submit={AuthController.login} type={'Login'}/>
  );
};

export default SignInPage;