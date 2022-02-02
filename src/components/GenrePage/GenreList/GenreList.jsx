import React, {useEffect, useState} from 'react';
import './GenreList.scss';
import GenreColumn from "./GenreColumn/GenreColumn";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import Button from "../../UI/Button/Button";
import TMDBMovieController from "../../../controllers/tmdb-movie-controller";
import {useParams} from "react-router";
import {useDispatch} from "react-redux";

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genresInColumn, setGenresInColumn] = useState(0)
  const [clear, setClear] = useState(false)
  const {width} = useWindowDimensions();

  const page = useParams()

  useEffect(()=>{
    clearSelectedGenres();
    }, [page])

  useEffect(() => {
    TMDBMovieController.getAllGenres().then(data => {
        setGenres(data.genres)
        setGenresInColumn(Math.ceil(data.genres.length / 3));
      }
    )
  }, [])

  function getGenreColumns(count) {
    return [...new Array(count)]
        .map((_, i) =>
            <GenreColumn
            genres={genres.slice(genresInColumn*i, genresInColumn*(i+1))}
            selectedGenres={selectedGenres}
            clear={clear}
            setSelectedGenres={setSelectedGenres}
            key={i}
        />)
  }

  const clearSelectedGenres = () => {
    setClear(!clear)
    setSelectedGenres([])
  }

  const dispatch = useDispatch()

  return genres && genresInColumn ? (
    <div className="genre-list">
      <div className="container">
        <div className="genre-list__flex">
          {width > 700 ?
            <div className="genre-list__row">
              {genresInColumn ? getGenreColumns(3) : null}
            </div>
            :
            <div className="genre-list__row">
              <GenreColumn
                genres={genres}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                clear={clear}
              />
            </div>
          }
          <div className='genre-list__bottom'>
            <Button onClick={() => dispatch({type: 'CHANGE_GENRES', payload: selectedGenres})}>
              Submit
            </Button>
            <Button onClick={clearSelectedGenres}>
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default GenreList;