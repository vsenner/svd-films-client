import React from 'react';
import './GenrePage.scss'
import GenreList from "./GenreList/GenreList";
import FilmList from "./FilmList/FilmList";
import {useParams} from "react-router-dom";

const GenrePage = () => {

  const a = useParams();
  console.log(a)

  return (
    <div>
      <GenreList/>
      <FilmList/>
    </div>
  );
};

export default GenrePage;