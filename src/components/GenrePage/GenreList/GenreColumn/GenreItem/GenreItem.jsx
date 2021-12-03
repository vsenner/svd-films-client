import React, {useState} from 'react';
import './GenreItem.scss'

const GenreItem = ({genre, selectedGenres, setSelectedGenres}) => {
  const [yes, setYes] = useState(false)
  const [no, setNo] = useState(false)

  const checkGenre = () => {
    return selectedGenres.findIndex(obj => obj.id === genre.id)
  }

  const changeGenres = (index, value) => {
    const arr = [...selectedGenres]
    arr[index] = {...selectedGenres[index], select: value}
    setSelectedGenres([...arr])
  }

  const enableGenre = () => {
    const index = checkGenre();
    if(index > -1) {
      changeGenres(index, true)
    }else {
      setSelectedGenres([...selectedGenres, {...genre, select: true}])
    }
  }

  const disableGenre = () => {
    const index = checkGenre();
    if(index > -1) {
      changeGenres(index, false)
    }else {
      setSelectedGenres([...selectedGenres, {...genre, select: false}])
    }
  }

  const removeGenre = () => {
    setSelectedGenres(selectedGenres.filter(sGenre => sGenre.id !== genre.id))
  }

  return (
    <div className="genre-list__item">
      <div>
        <input id={genre.id} type="radio" name={genre.id} checked={yes} onClick={() => {
          if(no){
            setYes(!yes)
            setNo(!no)
            enableGenre()
          }else{
            if(!yes){
              enableGenre()
            }else removeGenre()
            setYes(!yes)
        }}}/>
      </div>
      <div>
        <input type="radio" name={genre.id} checked={no} onClick={() => {
          if(yes){
            setYes(!yes)
            setNo(!no)
            disableGenre()
          }else{
            if(!no) {
              disableGenre()
            }else removeGenre()
            setNo(!no)
          }
        }}/>
      </div>
      <label htmlFor={genre.id} className="genre-list__name">
        {genre.name}
      </label>
    </div>
  );
};

export default GenreItem;