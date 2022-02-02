import React, {useState} from 'react';
import './GenreItem.scss'

const GenreItem = ({genre, selectedGenres, setSelectedGenres}) => {
  const [yes, setYes] = useState(false)
  const [no, setNo] = useState(false)

  const checkGenre = () => {
    return selectedGenres.findIndex(obj => obj.id === genre.id)
  }

  const addGenre = (index, value) => {
    const arr = [...selectedGenres]
    arr[index] = {...selectedGenres[index], select: value}
    setSelectedGenres(arr)
  }

  const enableGenre = () => {
    const index = checkGenre();
    if(index > -1) {
      changeGenres(index, true)
    }else {
      setSelectedGenres([...selectedGenres, {...genre, select: true}])
    }
  }

  return (
    <div className="genre-list__item">
      <div>
        <input id={genre.id} type="radio" className={'yes'} name={genre.id} checked={yes} onClick={() => {
          if(yes){
            unselectToggle(genre.id)
          }else{
            changeGenres(!yes)
            setNo(false)
          }
          setYes(!yes)
        }}/>
      </div>
      <div>
        <input type="radio" id={genre.id + 1} className={'no'} name={genre.id} checked={no} onClick={() => {
          if(no){
            unselectToggle(genre.id)
          }else{
            changeGenres(no)
            setYes(false)
          }
          setNo(!no)
        }}/>
      </div>
      <label htmlFor={genre.id} className="genre-list__name">
        {genre.name}
      </label>
    </div>
  );
};

export default GenreItem;