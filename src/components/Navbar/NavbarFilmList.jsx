import React from 'react';
import {Link} from "react-router-dom";
import {getImage} from "../../UI/getImage";

const NavbarFilmList = ({films, clearFilms}) => {
  return (
    <div className={'navbar__film-list'}>
      {films.map(film =>
      <Link key={film.id}
            className={'navbar__film-list__item'}
            to={`/film/${film.id}`}
            onClick={() => clearFilms('')}
      >

        <img className={'navbar__film-list__item_img'}
             src={film.poster_path
               ?
               getImage(film.poster_path)
               : 'https://i.ibb.co/3F9kRkx/no-poster.png'
             }
         alt={film.id}/>
        <p className={'navbar__film-list__item_title'}>{film.media_type === 'movie' ? film.original_title : film.name}</p>

      </Link>
      )}
    </div>
  );
};

export default NavbarFilmList;