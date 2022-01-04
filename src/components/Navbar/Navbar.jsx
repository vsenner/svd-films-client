import React, {useCallback, useEffect, useState} from 'react';
import './Navbar.scss'
import {Link} from "react-router-dom";
import logo from "../../images/icons8-film-64.png"
import debounce from "debounce";
import MovieController from "../../controllers/movie.controller";
import NavbarFilmList from "./NavbarFilmList";
import {useNavigate} from "react-router";
import LanguageDropDown from "./LanguageDropDown/LanguageDropDown";



const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [films, setFilms] = useState([])
  const [activeSearch, setActiveSearch] = useState(false)
  const changeHandler = (e) => {
    setSearchQuery(e.target.value)
  }
  const debounceInput = useCallback(debounce(changeHandler, 500), []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if(searchQuery.length > 1){
      MovieController.search(searchQuery).then(data => {
        setFilms(data)
      })
    }else{
      setFilms([])
    }
  },[searchQuery])

  const router = useNavigate()

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
            <Link to='/genres/movies' className="navbar__link">
              Movies
            </Link>
            <Link to='/genres/series' className="navbar__link">
              Series
            </Link>
            <Link to='/genres/cartoons' className="navbar__link">
              Cartoons
            </Link>
            <Link to='/genres/tv' className="navbar__link">
              TV Shows
            </Link>
          </div>
          <div className="navbar__wide-area">
            <LanguageDropDown/>

            {/*TODO: Change to custom input*/}
            <form onSubmit={e => {
              e.preventDefault();
              router(`/genres/search/${e.target.firstChild.value}`)
            }}>
              <input
                className={'navbar__search'}
                type="text"
                onChange={debounceInput}
                onFocus={() => {setActiveSearch(true)}}
                onBlur={() => {setActiveSearch(false)}}
                placeholder={'Find movie'}
              />
              {films.length > 0 && activeSearch ? <NavbarFilmList films={films} clearFilms={setSearchQuery}/> : null}
            </form>
          </div>
            <div className="navbar__profile">
              <Link to={'/account'} className='navbar__profile-link'>
                <img src="" alt=""/>
              </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;