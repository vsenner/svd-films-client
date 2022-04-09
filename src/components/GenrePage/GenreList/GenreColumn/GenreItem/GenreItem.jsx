import React, {useEffect, useState} from 'react';
import './GenreItem.scss'

const GenreItem = ({genre, selectedGenres, setSelectedGenres, clear}) => {
  const [yes, setYes] = useState(false)
  const [no, setNo] = useState(false)

  useEffect(() => {
    setYes(false)
    setNo(false)
  },[clear])

  const unselectToggle = (id) => {
    setSelectedGenres(...[selectedGenres.filter((el) => el.id !== id)])
  }

  const checkGenre = () => {
    return selectedGenres.findIndex(obj => obj.id === genre.id)
  }

  const addGenre = (index, value) => {
    const arr = [...selectedGenres]
    arr[index] = {...selectedGenres[index], select: value}
    setSelectedGenres(arr)
  }

  const changeGenres = (value) => {
    const index = checkGenre();
    if(index > -1) {
      addGenre(index, value)
    }else {
      setSelectedGenres([...selectedGenres, {name: genre.name, id: genre.id, select: value}])
    }
  }


  return (
    <div className="genre-list__item">
      <label className='genre-list__label'>
        <input id={genre.id} type="radio" className='genre-list__yes' name={genre.id} onChange={() => {}} checked={yes} onClick={() => {
          if(yes){
            unselectToggle(genre.id)
          }else{
            changeGenres(!yes)
            setNo(false)
          }
          setYes(prev => !prev)
        }}/>
      </label>
      <label className='genre-list__label'>
        <input type="radio" id={genre.id + 1} className='genre-list__no' name={genre.id} onChange={() => {}} checked={no} onClick={() => {
          if(no){
            unselectToggle(genre.id)
          }else{
            changeGenres(no)
            setYes(false)
          }
          setNo(prev => !prev)
        }}/>
      </label>
      <label htmlFor={genre.id} className="genre-list__name">
        {genre.name}
      </label>
    </div>
  );
};

export default GenreItem;