import React from 'react';
import './Navbar.scss'
import {Link} from "react-router-dom";
import logo from "../../images/icons8-film-64.png"

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="container">
        <div className="navbar__flex">
          <div className="navbar__logo">
            <Link to='/'>
              <img src={logo} alt="logo"/>
            </Link>
          </div>
          <div className="navbar__categories">
            <Link to='/genres' className="navbar__link">
              Movies
            </Link>
            <Link to='/genres' className="navbar__link">
              Series
            </Link>
            <Link to='/genres' className="navbar__link">
              Cartoons
            </Link>
            <Link to='/genres' className="navbar__link">
              TV Shows
            </Link>
          </div>
          <div className="navbar__wide-area">
            {/*TODO: Change to custom input*/}
            <input className="navbar__searchbar"/>
          </div>
          <Link to={'/account'}>
            <div className='navbar__account'>
              <img src="" alt=""/>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;