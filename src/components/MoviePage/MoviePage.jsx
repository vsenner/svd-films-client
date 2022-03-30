import React, {useEffect, useState} from 'react';
import '../../hoc/ContentPage/ContentPage.scss'
import {useParams} from "react-router-dom";
import TmdbMediaController from "../../controllers/tmdb-media-controller";
import ContentPage from "../../hoc/ContentPage/ContentPage";



const MoviePage = () => {
  const [film, setFilm] = useState(null);
  const [actors, setActors] = useState(null)
  const [director, setDirector] = useState(null)

  const {id} = useParams();

  useEffect(() => {
    TmdbMediaController.getMovieById(id).then((film) => {
      setFilm(film);
    })
    TmdbMediaController.getMovieActorsById(id).then((actors) => {
      setActors(actors)
    })
    TmdbMediaController.getMovieDirectorById(id).then((director) => {
      setDirector(director)
    })
  }, [id])

  return (
    <ContentPage content={film} director={director} actors={actors} content_type={'movie'}/>
  );
};

export default MoviePage;