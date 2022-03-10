import React, {useCallback, useEffect, useRef, useState} from 'react';
import './Navbar.scss'
import {Link} from "react-router-dom";
import logo from "../../images/icons8-film-64.png"
import debounce from "debounce";
import NavbarFilmList from "./NavbarFilmList";
import {useNavigate} from "react-router";
import LanguageDropDown from "./LanguageDropDown/LanguageDropDown";
import searchIcon from '../../images/search.svg'
import {useSelector} from "react-redux";
import TMDBMovieController from "../../controllers/tmdb-movie-controller";


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [films, setFilms] = useState([])
  const [activeSearch, setActiveSearch] = useState(false)
  const changeHandler = (e) => {
    setSearchQuery(e.target.value)
  }
  const debounceInput = useCallback(debounce(changeHandler, 500), []) // eslint-disable-line react-hooks/exhaustive-deps
  const searchInput = useRef();

  useEffect(() => {
    if (searchQuery.length > 1) {
      TMDBMovieController.search(searchQuery).then(data => {
        setFilms(data)
      })
    } else {
      setFilms([])
    }
  }, [searchQuery])

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!e.target.className.includes('navbar__film-list') && !e.target.className.includes('navbar__input')) {
        setActiveSearch(false);
      }

    })
  }, [])

  const router = useNavigate()

  const user = useSelector(state => state?.user);

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
              <Link to='/genres/movie/popularity' className="navbar__link">
                Movies
              </Link>
              <Link to='/genres/tv/popularity' className="navbar__link">
                Series
              </Link>
              <Link to='/genres/cartoons/popularity' className="navbar__link">
                Cartoons
              </Link>
            </div>
            <div className="navbar__wide-area">
              <LanguageDropDown/>

              {/*TODO: Change to custom input*/}
              <form
                  onSubmit={e => {
                    e.preventDefault();
                    router(`/genres/search/${searchInput.current.value}`)
                  }}>
                <label className={'navbar__search'}>
                  <img src={searchIcon} alt="search"/>
                  <input
                      className='navbar__input'
                      type="text"
                      ref={searchInput}
                      onFocus={() => setActiveSearch(true)}
                      onChange={debounceInput}
                      placeholder={'Find movie'}
                  />
                </label>
                {films.length > 0 && activeSearch ?
                    <NavbarFilmList films={films} clearFilms={setSearchQuery}/> : null}
              </form>
            </div>
            <div className="navbar__profile">
              <Link to={user.isAuth ? `/user/${user.id}` : '/login'} className='navbar__profile-link'>
                {user.isAuth ?
                    <img src={user.photo} alt="user" className='navbar__profile-photo'/>
                    :
                    <span className='navbar__profile-photo'>SIGN UP</span>}
              </Link>
            </div>
          </div>
        </div>
      </div>
  );
};

export default Navbar;