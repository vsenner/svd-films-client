import React, {useEffect, useState} from 'react';
import './FilmList.scss'
import TMDBMovieController from "../../../controllers/tmdb-movie-controller";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";

const FilmList = () => {
  const [filmList, setFilmList] = useState([])
  const params = useParams()
  const selectedGenres = useSelector((state) => state.movies.genres)

  useEffect(()=>{
      const sortMethod = params.sortMethod + '.desc'
      if (params.type === 'movies') {//switch
          TMDBMovieController.getMoviesWithGenres([...selectedGenres, {id: 16, select: false}], sortMethod)
              .then((data) => {
                      setFilmList(data.results)
                  }
              )
      }
      if (params.type === 'series') {
          TMDBMovieController.getSeriesWithGenres(selectedGenres, sortMethod)
              .then((data) => {
                      setFilmList(data.results)
                  }
              )
      }
      if (params.type === 'cartoons') {
          TMDBMovieController.getMoviesWithGenres([...selectedGenres, {id: 16, select: true}], sortMethod)
              .then((data) => {
                      setFilmList(data.results)
                  }
              )
      }
  },[selectedGenres, params.type, params.sortMethod])

  return (
      <div>
        <div className='buttons'>
          <Link to={`/genres/${params.type}/popularity`}>Most popular</Link>
          <Link to={`/genres/${params.type}/vote_average`}>Best rated</Link>
          <Link to={`/genres/${params.type}/primary_release_date`}>Release date</Link>
        </div>
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
