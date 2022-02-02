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
    if(filmList.length){
      const sorted = sortByGenres(filmList)
    }
  },[selectedGenres, filmList])

  const sortByGenres = (filmList) =>{
    return filmList.reduce((pre, film)=>{
      const selectedArray = selectedGenres.reduce((pre, selGen) => {
        if (film?.genre_ids.includes(selGen.id)) {
          if (selGen.select === true) {
            return [...pre, {select: true}]
          }
          if (!selGen.select) {
            return [...pre, {select: false}]
          }
        }
        return pre
      }, [])
      if(selectedArray.length){
        return selectedArray.find((el) => el.select === false)?
            pre : [...pre, film]
      }
      return pre
    },[])
  }

  /*const sortByGenres = (filmList) =>{
    return filmList.filter((film)=>{
      const a = selectedGenres.every((selGen)=>  !(film.genre_ids.includes(selGen.id) && !selGen.select));

      const selectedYesCount = selectedGenres.filter((genre)=>genre.select).length;

      if(selectedYesCount) {
        const isAnyGenre = selectedGenres.some(genre => film.genre_ids.includes(genre.id));
        return a && isAnyGenre
      }
      return a
    })
  }*/

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
