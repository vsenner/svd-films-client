import React from 'react';
import AuthController from "../../controllers/auth-controller";
import LoginPage from "../../hoc/LoginPage/LoginPage";


const SignUpPage = () => {
  return (
    <LoginPage submit={AuthController.registration} type={'Sign Up'}/>
  );
};

export default SignUpPage;