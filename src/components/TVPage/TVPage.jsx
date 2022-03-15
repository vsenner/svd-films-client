import '../../hoc/ContentPage/ContentPage.scss';
import React, {useEffect, useState} from 'react';
import TMDBMovieController from "../../controllers/tmdb-movie-controller";
import {useParams} from "react-router-dom";
import ContentPage from "../../hoc/ContentPage/ContentPage";

const TvPage = () => {
  const {id} = useParams()
  const [TV, setTV] = useState(null);
  const [actors, setActors] = useState(null)
  const [director, setDirector] = useState(null)

  useEffect(() => {
    TMDBMovieController.getTVById(id).then((data) => {
      setTV(data);
    })
    TMDBMovieController.getTVActorsById(id).then((actors) => {
      setActors(actors)
    })
    TMDBMovieController.getTVDirectorById(id).then((director) => {
      setDirector(director)
    })
  }, [id])


  return (
    <ContentPage content={TV} actors={actors} director={director} content_type={'tv'}/>
  );
};

export default TvPage;