import React, {useEffect, useState} from 'react';
import './FilmPage.scss'
import MovieController from "../../controllers/movie-controller";
import {useParams} from "react-router-dom";
import TruncatedText from "../UI/TruncatedText/TruncatedText";
import ActorList from "./ActorList/ActorList";
import Rate from "../UI/Rate/Rate";
import {getImage} from "../../UI/getImage";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import TMDBMovieController from "../../controllers/tmdb-movie-controller";


const minsToHours = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

const FilmPage = () => {
  const params = useParams();
  const [film, setFilm] = useState(null);
  const [actors, setActors] = useState(null)
  const [director, setDirector] = useState(null)
  const [userFilmInfo, setUserFilmInfo] = useState(null);

  const user = useSelector(state => state?.user)

  useEffect(() => {
    TMDBMovieController.getById(params.id).then((film) => {
      setFilm(film);
    })
    TMDBMovieController.getActorsById(params.id).then((actors) => {
      setActors(actors)
    })
    TMDBMovieController.getMovieDirectorById(params.id).then((director) => {
      setDirector(director)
    })
  }, [params.id])

  useEffect(() => {
    if(user.id) {
      MovieController.getUserFilmInfo(params.id, user.id).then(data => {
        setUserFilmInfo(data)
      })
    }
  }, [params.id, user.id])

  const router = useNavigate()

  const redirectToLogin = () => router('/login');

  const addFavourite = async () => {
    try {
      await MovieController.addFavourite(params.id, user.id);
      setUserFilmInfo(prev => ({...prev, isFavourite: true}));
    } catch (err) {
      console.log(err);
    }
  }

  const removeFavourite = async () => {
    try {
      await MovieController.removeFavourite(params.id, user.id);
      setUserFilmInfo(prev => ({...prev, isFavourite: false}));
    } catch (err) {
      console.log(err);
    }
  }

  const addLater = async () => {
    try {
      await MovieController.addLater(params.id, user.id);
      setUserFilmInfo(prev => ({...prev, isLater: true}));
    } catch (err) {
      console.log(err);
    }
  }

  const removeLater = async () => {
    try {
      await MovieController.removeLater(params.id, user.id);
      setUserFilmInfo(prev => ({...prev, isLater: false}));
    } catch (err) {
      console.log(err);
    }
  }

  const rateFilm = async (rating) => {
    try {
      await MovieController.addRated(params.id, rating, user.id);
      setUserFilmInfo(prev => ({...prev, isRated: true, rating}));
    } catch (err) {
      console.log(err);
    }
  }

  const unRateFilm = async () => {
    try {
      await MovieController.removeRated(params.id, user.id);
      setUserFilmInfo(prev => ({...prev, isRated: false, rating: null}));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='film-page'>
      <div className="container">
        {film ?
          <div className="film-page__film film">
            <div className="film__main">
              <div className="film__poster">
                <img src={getImage(film.poster_path)} alt="Poster" width='300px'/>
              </div>
              <div className="film__info info">
                <div className="info__header">
                  <h1 className='info__title'>
                    {film.title}
                    {film.release_date ? <span>({film.release_date.split('-')[0]})</span> : ''}
                  </h1>
                  {film.tagline ?
                    <div className="info__row">
                      <div className="info__tagline">
                        {film.tagline}
                      </div>
                    </div>
                    :
                    ''
                  }
                  <div className="info__row_start">
                    <div className="info__rating">{film.vote_average} &#9733;</div>
                    <div className='info__adult'>
                      {film.adult ?
                        '18+'
                        :
                        '0+'}
                    </div>
                    <div className="info__countries">
                      {film.production_countries.map(country => country.iso_3166_1).join(', ')}
                    </div>
                    <div className="info__status" style={{color: film.status === 'Released' ? '#00c803' : '#d00203'}}>
                      {film.status}
                    </div>
                  </div>
                </div>

                <div className="info__row">
                  <button className='info__btn'>
                    {userFilmInfo?.isFavourite ?
                      <i onClick={removeFavourite} className="fas fa-heart"/>
                      :
                      <i onClick={user.isAuth ? addFavourite : redirectToLogin} className="far fa-heart"/>}
                  </button>
                  <button className='info__btn'>
                    {userFilmInfo?.isLater ?
                      <i onClick={removeLater} className="fas fa-bookmark"/>
                      :
                      <i onClick={user.isAuth ? addLater : redirectToLogin} className="far fa-bookmark"/>}
                  </button>
                </div>

                <div className="info__main">
                  <div className="info__row">
                    <span>Production year</span> {film.release_date.split('-')[0]}
                  </div>
                  <div className="info__row">
                    <span>Country</span> {film.production_countries.map(country => country.name).join(', ')}
                  </div>
                  <div className="info__row">
                    <span>Duration</span> {minsToHours(film.runtime)}
                  </div>
                  {film.genres ?
                    <div className="info__row">
                      <span>Genres</span> {film.genres.map(genre => genre.name).join(', ')}
                    </div>
                    :
                    ''
                  }
                  {director ?
                    <div className="info__row">
                      <span>Director</span> {director.name}
                    </div>
                    :
                    null
                  }
                  <div className="info__row">
                    <span>Budget</span> ${film.budget.toLocaleString()}
                  </div>
                  <div className="info__row">
                    <span>Revenue</span> ${film.revenue.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="film__bottom">
              {actors ? <ActorList actors={actors.slice(0, 5)} className='film__actors'/> : ''}
              {film.overview ?
                <div className="film__description">
                  <h2>Overview</h2>
                  <TruncatedText str={film.overview} n={300}/>
                </div>
                : ''}
              <div className="film__rating">
                <h2>Film Rating</h2>
                <div className="rating__row">
                  <Rate avgRating={film.vote_average} action={user.isAuth ? rateFilm : redirectToLogin}/>
                  <div className="rating__value">{film.vote_average}</div>
                </div>
                {userFilmInfo?.isRated ?
                  <div className="rating__mine">
                    My rating
                    <span style={{background: userFilmInfo.rating < 5 ? 'red' : 'green'}}>{userFilmInfo.rating}</span>
                    <button
                      onClick={unRateFilm}
                      className="rating__remove"
                    >
                      Remove
                    </button>
                  </div>
                  : null}
              </div>
            </div>
          </div>
          :
          ''}
      </div>
    </div>
  );
};

export default FilmPage;