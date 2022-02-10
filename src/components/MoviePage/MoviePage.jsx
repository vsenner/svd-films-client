import React, {useEffect, useState} from 'react';
import '../../hoc/ContentPage.scss'
import {useParams} from "react-router-dom";
import TMDBMovieController from "../../controllers/tmdb-movie-controller";
import ContentPage from "../../hoc/ContentPage";



const MoviePage = () => {
  const [film, setFilm] = useState(null);
  const [actors, setActors] = useState(null)
  const [director, setDirector] = useState(null)

  const params = useParams();

  useEffect(() => {
    TMDBMovieController.getMovieById(params.id).then((film) => {
      setFilm(film);
    })
    TMDBMovieController.getMovieActorsById(params.id).then((actors) => {
      setActors(actors)
    })
    TMDBMovieController.getMovieDirectorById(params.id).then((director) => {
      setDirector(director)
    })
  }, [params.id])




  return (
    <ContentPage content={film} director={director} actors={actors} content_type={'movie'}/>
  );
};

export default MoviePage;