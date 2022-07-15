import './App.scss';
import Router from "./Router/Router";
import {useEffect} from "react";
import AuthController from "../controllers/auth-controller";
import NewNavbar from "./Navbar/NewNavbar";

function App() {

  useEffect(() => {
    if(!localStorage.getItem('lang')) {
      localStorage.setItem('lang', navigator.language.split('-')[0].toLowerCase());
      window.location.reload();
    }
    if(localStorage.getItem('token')) {
      AuthController.refresh();
    }
  }, [])

  return (
      <div className="App">
        <NewNavbar/>
        <Router/>
      </div>
  );
}

export default App;
