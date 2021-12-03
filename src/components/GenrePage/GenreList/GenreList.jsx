import React, {useEffect, useState} from 'react';
import './GenreList.scss'
import GenreColumn from "./GenreColumn/GenreColumn";
import MovieController from "../../../controllers/movie.controller";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import Button from "../../UI/Button/Button";

const GenreList = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([])
  const [genresInColumn, setGenresInColumn] = useState(0)
  const {width} = useWindowDimensions();

  useEffect(() => {
    MovieController.getAllGenres().then(data => {
        setGenres(data.genres)
        setGenresInColumn(Math.ceil(data.genres.length / 3));
      }
    )
  }, [])

  function getGenreColumns() {
    let genreColumns = []
    for(let i = 0; i < 3; i++) {
      genreColumns.push(<GenreColumn genres={genres.slice(genresInColumn*i, genresInColumn*(i+1))} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} key={i}/>)
    }
    return genreColumns
  }

  return genres && genresInColumn ? (
    <div className="genre-list">
      <div className="container">
        <div className="genre-list__flex">
          {width > 700 ?
            <div className="genre-list__row">
              {genresInColumn ? getGenreColumns() : null}
            </div>
            :
            <div className="genre-list__row">
              <GenreColumn
                genres={genres}
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
              />
            </div>
          }
          <Button>
            Submit
          </Button>
        </div>
      </div>
    </div>
  ) : null;
};

export default GenreList;