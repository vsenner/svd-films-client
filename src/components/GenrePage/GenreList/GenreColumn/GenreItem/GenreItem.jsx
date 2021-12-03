import React, {useState} from 'react';
import './GenreItem.scss'

const GenreItem = ({genre, selectedGenres, setSelectedGenres}) => {
  const [lastValue, setLastValue] = useState({yes: false, no: false})

  const selectGenre = (e) => {
    if (lastValue.yes) {
      setSelectedGenres(selectedGenres.filter(sGenre => sGenre.id !== genre.id))
      e.target.checked = false;
    }
    if (!lastValue.yes) {
      lastValue.no ?
        setSelectedGenres([...selectedGenres.filter(sGenre => sGenre.id !== genre.id), {...genre, select: true}])
        :
        setSelectedGenres(prev => [...prev, {...genre, select: true}])
    }

    setLastValue({...lastValue, yes: e.target.checked})
  }

  const deleteGenre = (e) => {
    if (lastValue.no) {
      setSelectedGenres(selectedGenres.filter(sGenre => sGenre.id !== genre.id))
      e.target.checked = false;
    }
    if (!lastValue.no) {
      lastValue.yes ?
        setSelectedGenres([...selectedGenres.filter(sGenre => sGenre.id !== genre.id), {...genre, select: false}])
        :
        setSelectedGenres(prev => [...prev, {...genre, select: false}])
    }

    setLastValue({...lastValue, no: e.target.checked})
  }

  return (
    <div className="genre-list__item">
      <div>
        <input id={genre.id} type="radio" name={genre.id} onClick={selectGenre}/>
      </div>
      <div>
        <input type="radio" name={genre.id} onClick={deleteGenre}/>
      </div>
      <label htmlFor={genre.id} className="genre-list__name">
        {genre.name}
      </label>
    </div>
  );
};

export default GenreItem;