import '../../hoc/ContentPage/ContentPage.scss';
import React, {useEffect, useState} from 'react';
import TmdbMediaController from "../../controllers/tmdb-media-controller";
import {useParams} from "react-router-dom";
import ContentPage from "../../hoc/ContentPage/ContentPage";

const TvPage = () => {
  const {id} = useParams()
  const [TV, setTV] = useState(null);
  const [actors, setActors] = useState(null)
  const [director, setDirector] = useState(null)

  useEffect(() => {
    TmdbMediaController.getTVById(id).then((data) => {
      setTV(data);
    })
    TmdbMediaController.getTVActorsById(id).then((actors) => {
      setActors(actors)
    })
    TmdbMediaController.getTVDirectorById(id).then((director) => {
      setDirector(director)
    })
  }, [id])


  return (
    <ContentPage content={TV} actors={actors} director={director} content_type={'tv'}/>
  );
};

export default TvPage;