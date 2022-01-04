import './App.scss';
import Router from "./Router/Router";
import Navbar from "./Navbar/Navbar";
import {useEffect} from "react";


function App() {
  useEffect(() => {
    if(!localStorage.getItem('lang')) {
      localStorage.setItem('lang', navigator.language.split('-')[0].toUpperCase());
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
