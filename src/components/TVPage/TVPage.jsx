import '../../hoc/ContentPage.scss';
import React, {useEffect, useState} from 'react';
import TMDBMovieController from "../../controllers/tmdb-movie-controller";
import {useParams} from "react-router-dom";
import ContentPage from "../../hoc/ContentPage";

const TvPage = () => {
  const params = useParams()
  const [TV, setTV] = useState(null);
  const [actors, setActors] = useState(null)
  const [director, setDirector] = useState(null)

  useEffect(() => {
    TMDBMovieController.getTVById(params.id).then((data) => {
      setTV(data);
    })
    TMDBMovieController.getTVActorsById(params.id).then((actors) => {
      setActors(actors)
    })
    TMDBMovieController.getTVDirectorById(params.id).then((director) => {
      console.log(director, 'director')
      setDirector(director)
    })
  }, [params.id])


  return (
    <ContentPage content={TV} actors={actors} director={director} content_type={'tv'}/>
  );
};

export default TvPage;