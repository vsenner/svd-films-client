import React, {useEffect, useState} from 'react';
import './MediaItem.scss'
import {Link} from "react-router-dom";
import {getSmallImage} from "../../../../utils";
import TmdbMediaController from "../../../../controllers/tmdb-media-controller";
import {useNavigate, useParams} from "react-router";
import {addFavourite, addLater, removeFavourite, removeLater} from "../../../../scripts/userListMethods";
import {useSelector} from "react-redux";
import MovieController from "../../../../controllers/movie-controller";
import TVController from "../../../../controllers/tv-controller";

const NO_POSTER_PATH = 'https://i.ibb.co/nj8KNJv/no-poster.png'

const MovieKeys = {
  title: 'title',
  date: 'release_date'
}

const TvKeys = {
  title: 'name',
  date: 'first_air_date'
}

const minsToHours = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

const MediaItem = ({poster_path, original_title, type, id}) => {
  const [film, setFilm] = useState(null);
  const [userFilmInfo, setUserFilmInfo] = useState(null);

  const {media_type} = useParams();

  const user = useSelector(state => state?.user)

  const router = useNavigate()

  const keys = media_type === 'tv' ? TvKeys : MovieKeys;
  const redirectToLogin = () => router('/login');

  useEffect(() => {
    media_type === 'tv' ?
    TmdbMediaController.getTVById(id).then((film) => {
      setFilm(film);
    })
        :
    TmdbMediaController.getMovieById(id).then((film) => {
      setFilm(film);
    })
  }, [media_type, id]);

  useEffect(() => {
    if (user.id) {
      switch (media_type) {
        case 'movie':
          MovieController.getUserFilmInfo(id, user.id).then(data => {
            setUserFilmInfo(data)
          })
          break;
        case 'tv':
          TVController.getUserTVInfo(id, user.id).then(data => {
            setUserFilmInfo(data)
          });
          break;
        case 'cartoons':
          MovieController.getUserFilmInfo(id, user.id).then(data => {
            setUserFilmInfo(data)
          })
          break;
        default:
      }
    }
  }, [id, user.id, media_type])

  const concatTitle = (title) => {
    return title?.length >= 17 ? title.slice(0,16).concat('...') : title
  }

  const getDuration = (content) =>{
    try{//When you switch media type from movie(or cartoon) to tv some reason film cannot be filled by series, but when you do opposite it is ok, this err cause larger load time on tv page
      if(media_type === 'tv'){
        if(isNaN(content?.episode_run_time[0])){
          return null
        }
        else{
          return minsToHours(content?.episode_run_time[0])
        }
      }
      else{
        if(isNaN(content?.runtime)){
          return null
        }
        else{
          return minsToHours(content?.runtime)
        }
      }
    }catch(err){
      console.log(err)
    }

  }

  return film ? (
      <div className='media-list__item media-item'>
        <Link to={`/${type}/${id}/overview`}>
          <div className="media-item__img">
            <img src = {poster_path ? getSmallImage(poster_path) : NO_POSTER_PATH} alt={original_title}/>
            <div className="media-item__hover"/>
          </div>
          <div className='media-item__name'>{concatTitle(film[keys.title])}</div>
          <div className="media-item__info-row-1">
            <span className="media-item__info-item">{film[keys.date]?.slice(0,4)}</span>
            <span className="media-item__info-item">{film?.production_countries?.map(country => country.iso_3166_1).join(', ')}</span>
            {
              getDuration(film) ?
                  <span className="media-item__info-item">{getDuration(film)}</span>
                  :
                  null
            }
          </div>
        </Link>

        <div className='media-item__info-row-2'>
          <span className='media-item__buttons'>
            <button className='media-item__btn'>
                {userFilmInfo?.isLater ?
                    <div onClick={() => removeLater(setUserFilmInfo, film.id, user.id, media_type)}
                         className="media-item__filledBookmark"/>
                    :
                    <div
                        onClick={user.isAuth ? () => addLater(setUserFilmInfo, film.id, user.id, media_type) : redirectToLogin}
                        className="media-item__emptyBookmark"/>}
              </button>
              <button className='media-item__btn'>
                {userFilmInfo?.isFavourite ?
                    <div onClick={() => removeFavourite(setUserFilmInfo, film.id, user.id, media_type)}
                         className="media-item__filledHeart"/>
                    :
                    <div
                        onClick={user.isAuth ? () => addFavourite(setUserFilmInfo, film.id, user.id, media_type) : redirectToLogin}
                        className="media-item__emptyHeart"/>
                }
              </button>
          </span>
          <span className='media-item__rating'>
            <span className='media-item__star'/>
            {film.vote_average}
          </span>
        </div>
      </div>
  ) : null;
};

export default MediaItem;