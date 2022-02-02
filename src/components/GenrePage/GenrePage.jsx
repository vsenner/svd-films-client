import React, {useState} from 'react';
import './GenrePage.scss'
import GenreList from "./GenreList/GenreList";
import FilmList from "./FilmList/FilmList";

const GenrePage = () => {

    const [selectedGenres, setSelectedGenres] = useState()

    const transf = (selectedGenres) => {
        setSelectedGenres(selectedGenres)
    }

  return (
    <div>
      <GenreList onChange={transf}/>
      <FilmList selectedGenres={selectedGenres}/>
    </div>
  );
};

export default GenrePage;

