import './App.scss';
import Router from "./Router/Router";
import Navbar from "./Navbar/Navbar";
import {useEffect} from "react";
import AuthController from "../controllers/auth-controller";


function App() {
  useEffect(() => {
    if(!localStorage.getItem('lang')) {
      localStorage.setItem('lang', navigator.language.split('-')[0].toLowerCase());
      window.location.reload();
    }
    if(localStorage.getItem('token')) {
      AuthController.checkAuth();
    }
  }, [])

  return (
      <div className="App">
        <Navbar/>
        <Router/>
      </div>
  );
}

export default App;
