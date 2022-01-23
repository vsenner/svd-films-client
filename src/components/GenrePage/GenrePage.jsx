import React from 'react';
import './GenrePage.scss'
import GenreList from "./GenreList/GenreList";
import FilmList from "./FilmList/FilmList";

const GenrePage = () => {

  return (
    <div>
      <GenreList/>
      <FilmList/>
    </div>
  );
};

export default GenrePage;

