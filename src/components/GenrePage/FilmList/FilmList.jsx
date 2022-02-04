import React, {useEffect, useState} from 'react';
import './FilmList.scss'
import TMDBMovieController from "../../../controllers/tmdb-movie-controller";
import {useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const FilmList = () => {
  const [filmList, setFilmList] = useState([])
  const params = useParams()

  useEffect(() => {
    switch(params.type){
      case 'movies': TMDBMovieController.getPopular().then(films=>{
        setFilmList(films.results)
      })
        break;
      case 'series': TMDBMovieController.getTVSeries().then(series=>{
        setFilmList(series)
      })
        break;
      case 'cartoons': TMDBMovieController.getCartoons().then(cartoons=> {
        setFilmList(cartoons)
      })
        break;
      case 'tv': TMDBMovieController.getTVShows().then(tvs=> {
        setFilmList(tvs)
      })
        break;

      default:
    }

  }, [params.type])

  const selectedGenres = useSelector((state) => state.movies.genres)

  useEffect(()=>{
    if (selectedGenres.length){
      TMDBMovieController.getWithGenres(selectedGenres).then((data)=>{
            setFilmList(data.results)
          }
      )
    }
  },[selectedGenres])

  return (
      <div>
        {
          filmList ? filmList.map(film =>
              <div key={film.id}>
                {params.type === 'series' || params.type === 'tv' ? film.name : film.title}
              </div>
          ) : null
        }
      </div>
  );
};

export default FilmList;
