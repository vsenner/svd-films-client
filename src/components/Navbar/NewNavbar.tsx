import React, {FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import './NewNavbar.scss'
import {Link} from "react-router-dom";
import debounce from "debounce";
import NavbarMediaList from "./NavbarMediaList/NavbarMediaList";
import {useNavigate} from "react-router";
import searchIcon from '../../images/search.svg';
import arrow from '../../images/caret-down.svg';
import {useSelector} from "react-redux";
import TmdbMediaController from "../../controllers/tmdb-media-controller";
import Button, {ButtonType} from "../../UI/Buttons/Button";
import {getInitials} from "../../utils";
import LanguageDropDown from "./LanguageDropDown/LanguageDropDown";
import {IMovie, ITv, mediaTypes} from "../../models/media";

const NewNavbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [media, setMedia] = useState<(IMovie | ITv)[]>([]);
  const [selectedMediaType, setSelectedMediaType] = useState<mediaTypes>(mediaTypes.ALL);
  const [activeSelect, setActiveSelect] = useState<boolean>(false);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const closeNavbarMediaList = () => {
    setActiveSearch(false);
    setMedia([]);
    if (searchInput.current) {
      searchInput.current.value = '';
    }
  };

  const selectSearchType = (type: mediaTypes) => {
    setSelectedMediaType(type);
  }

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    router(`/genres/search/${selectedMediaType}/${searchInput.current?.value}/popularity`);
    setActiveSearch(false);
  };

  const changeHandler = (e: InputEvent) => {
    const target = e.target as HTMLInputElement
    setSearchQuery(target.value);
  };

  const closeMenu = () => showMenu ? setShowMenu(false) : null


// eslint-disable-next-line
  const debounceInput = useCallback(debounce(changeHandler, 500), []) as any;
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.length > 1) {
      TmdbMediaController.navbarSearch(searchQuery, selectedMediaType).then(data => {
        if (data.list) {
          setMedia(data.list);
        }
      });
    } else {
      setMedia([]);
    }
  }, [searchQuery, selectedMediaType]);

  useEffect(() => {
    const removeFocus = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!/navbar__input/.test(target.className)) {
        setActiveSearch(false)
      }
    }
    document.addEventListener('click', removeFocus);

    return () => {
      document.removeEventListener('click', removeFocus)
    }
  }, []);

  useEffect(() => {
    if(showMenu) {
      document.body.classList.add('lock')
    } else {
      document.body.classList.remove('lock')
    }
  }, [showMenu])

  const router = useNavigate();

  // @ts-ignore
  const user = useSelector(state => state?.user);

  return (
    <div className='navbar'>
      <div className="navbar__container">
        <Button type={ButtonType.primary}
                height={40}
                width={80}
                onClick={() => router(`/`)}>
          SVD
        </Button>

        <div className={`navbar__menu menu ${showMenu ? 'active' : ''}`}>
          <div className="menu__bg" onClick={closeMenu}/>
          <button className="menu__burger" onClick={() => setShowMenu(prev => !prev)}>
            <span/>
            <span/>
            <span/>
          </button>
          <ul className="menu__links">
            <li className="menu__link">
              <Link to='/genres/movie/popularity' onClick={closeMenu}>
                Movies
              </Link>
            </li>
            <li className="menu__link">
              <Link to='/genres/tv/popularity' onClick={closeMenu}>
                Series
              </Link>
            </li>
            <li className="menu__link">
              <Link to='/genres/cartoons/popularity' onClick={closeMenu}>
                Cartoons
              </Link>
            </li>
          </ul>
        </div>

        <div className="navbar__search">
          <div className="navbar__select select"
               onMouseLeave={() => activeSelect ? setActiveSelect(false) : null}
          >
            <button className={`select__item select__item_selected`} onClick={() => setActiveSelect(prev => !prev)}>
              <span>{selectedMediaType}</span>
              <img className={activeSelect ? ' active' : ''} src={arrow} alt="choose search type"/>
            </button>
            <ul className={`select__list ${activeSelect ? 'active' : ''}`}>
              <li className="select__item">
                <button id={'movie'}
                        onClick={() => selectSearchType(mediaTypes.MOVIE)}>
                  <i className="fas fa-film"/>
                  {mediaTypes.MOVIE}'s
                </button>
              </li>
              <li className="select__item">
                <button id={'tv'}
                        onClick={() => selectSearchType(mediaTypes.TV)}>
                  <i className="fas fa-tv"/>
                  {mediaTypes.TV}'s
                </button>
              </li>
              <li className="select__item">
                <button id={'all'}
                        onClick={() => selectSearchType(mediaTypes.ALL)}>
                  <i className="fas fa-search"/>
                  {mediaTypes.ALL}
                </button>
              </li>
            </ul>
          </div>
          <form
            onSubmit={submitFormHandler}
            className='navbar__search-form'
          >
            <input
              className='navbar__input'
              type="text"
              ref={searchInput}
              onFocus={() => {
                setActiveSearch(true)
              }}
              onChange={debounceInput}
              placeholder={'Search'}
            />
            <button>
              <img className={'navbar__search-icon'} src={searchIcon} alt="search"/>
            </button>
          </form>
          {media.length > 0 && activeSearch ?
            <NavbarMediaList media_type={selectedMediaType} media_list={media}
                             afterRedirect={closeNavbarMediaList}/> : null
          }
        </div>
        <Link className={`navbar__profile${user.isAuth ? '_auth' : ''}`}
              to={user.isAuth ? `/user/${user.id}` : '/login'}>
          {user.isAuth ?
            getInitials(user.username) :
            <React.Fragment>Sign up</React.Fragment>
          }
        </Link>
        <LanguageDropDown/>
      </div>

    </div>
  );
};

export default NewNavbar;