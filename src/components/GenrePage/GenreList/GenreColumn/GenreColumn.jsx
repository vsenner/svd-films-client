import React from 'react';
import './GenreColumn.scss'
import GenreItem from "./GenreItem/GenreItem";

const GenreColumn = ({genres, selectedGenres, setSelectedGenres}) => {
  return (
    <div className='genre-list__column'>
      <div className="genre-list__header">
        <div>Yes</div>
        <div>No</div>
        <div>Genre</div>
      </div>
      {genres.map(genre =>
        <GenreItem
          genre={genre}
          selectedGenres={selectedGenres}
          setSelectedGenres={setSelectedGenres}
          key={genre.id}
        />)}
    </div>
  );
};

export default GenreColumn;