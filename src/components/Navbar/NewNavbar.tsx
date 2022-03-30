import React, {ChangeEventHandler, FormEvent, useCallback, useEffect, useRef, useState} from 'react';
import './NewNavbar.scss'
import {Link} from "react-router-dom";
import debounce from "debounce";
import NavbarMediaList from "./NavbarMediaList";
import {useNavigate} from "react-router";
import searchIcon from '../../images/search.svg';
import arrow from '../../images/caret-down.svg';
import {useSelector} from "react-redux";
import TmdbMediaController from "../../controllers/tmdb-media-controller";
import Button, {ButtonType} from "../../UI/Buttons/Button";
import {getInitials} from "../../utils";
import LanguageDropDown from "./LanguageDropDown/LanguageDropDown";


const NewNavbar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [media, setMedia] = useState<[]>([]);
  const [selected, setSelected] = useState<string>('All');
  const [mediaType, setMediaType] = useState<string>('all');
  const [activeSelect, setActiveSelect] = useState<boolean>(false);
  const [activeSearch, setActiveSearch] = useState<boolean>(false);

  const closeNavbarMediaList = () => {
    setActiveSearch(false);
    setMedia([]);
    setSearchQuery('');
  };

  const selectSearchType = (type?: string, selected?: string) => {
    if(!activeSelect) {
      setActiveSearch(false);
    }
    if(type && selected){
      setMediaType(type);
      setSelected(selected);
    }
    setActiveSelect(prev => !prev);
  }

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    router(`/genres/search/${mediaType}/${searchInput.current?.value}/popularity`);
    closeNavbarMediaList();
  };

  const changeHandler = (e: InputEvent) => {
    const target = e.target as HTMLInputElement
    setSearchQuery(target.value);
  };

  const debounceInput = useCallback(debounce(changeHandler, 500), []) as unknown as ChangeEventHandler<HTMLInputElement>// eslint-disable-line react-hooks/exhaustive-deps
  const searchInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchQuery.length > 1) {
      TmdbMediaController.navbarSearch(searchQuery, mediaType).then(data => {
        setMedia(data.list);
      });
    } else {
      setMedia([]);
    }
  }, [searchQuery, mediaType]);

  useEffect(() => {
    document.addEventListener('click', (e) => {
      const target = e.target as Element;
      if (/'navbar__film-list.+navbar__input|navbar__input.+navbar__film-list'/.test(target.className)) {
        setActiveSearch(false);
      }
      if(/'navbar__search-type-list_active'/.test(target.className)){
        setActiveSearch(false);
      }
    })
  }, []);

  const router = useNavigate();

  // @ts-ignore
  const user = useSelector(state => state?.user);

  return (
    <div className='navbar'>
      <div className="navbar__container">
        <Button  text={'FVDS'} type={ButtonType.primary}
                height={40}
                width={80}
                onClick={() => router(`/`)}>
        </Button>

        {/*<Link to='/genres/movie/popularity' className="navbar__link">*/}
        {/*  Movies*/}
        {/*</Link>*/}

        <div className="navbar__search">
          <div className="navbar__search-type">
            <div className={`navbar__search-type_selected`} onClick={() => selectSearchType()}>
              <span className="navbar__search-type_selected-text">{selected}</span>
              <img className={`navbar__search-type_selected-icon${activeSelect ? '_active' : ''}`} src={arrow} alt="search"/>
            </div>
            <div className={`navbar__search-type-list${activeSelect ? '_active' : ''}`}>
              <span className="navbar__search-type_item" id={'movie'} onClick={() => selectSearchType('movie', `Movie's`)}>Movie's</span>
              <span className="navbar__search-type_item" id={'tv'} onClick={() => selectSearchType('tv', `TV's`)}>TV's</span>
              <span className="navbar__search-type_item" id={'all'} onClick={() => selectSearchType('all', `ALL`)}>ALL</span>
            </div>
          </div>
          <form
            onSubmit={submitFormHandler}
            className={'navbar__search-form'}
          >
            <label className={'navbar__search-input'}>
              <input
                className='navbar__input'
                type="text"
                ref={searchInput}
                onFocus={() => {
                  setActiveSearch(true);
                  setActiveSelect(false);
                }}
                onChange={debounceInput}
                placeholder={'Search'}
              />

            </label>
            {media.length > 0 && activeSearch ?
              <NavbarMediaList media_type={mediaType} media_list={media} clearFilms={setSearchQuery}/> : null}
          </form>
          <img className={'navbar__search-icon'} src={searchIcon} alt="search"/>
        </div>


        <div className="navbar__wide-area">


        </div>
        <Link className={'navbar__profile' + user.isAuth ? '_auth' : ''}
              to={user.isAuth ? `/user/${user.id}` : '/login'}>
          {user.isAuth ?
            getInitials(user.username) :
            <span>Sign up</span>}
        </Link>
        <LanguageDropDown/>
      </div>

    </div>
  );
};

export default NewNavbar;