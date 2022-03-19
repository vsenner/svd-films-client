import React, {useEffect, useState} from 'react';
import MovieController from "../../controllers/movie-controller";
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";
import {
  addFavourite,
  addLater,
  rateFilm,
  removeFavourite,
  removeLater,
  unRateFilm
} from "../../scripts/userListMethods";
import TruncatedText from "../../components/UI/TruncatedText/TruncatedText";
import Rate from "../../components/UI/Rate/Rate";
import './ContentPage.scss'
import {useNavigate} from "react-router";
import TVController from "../../controllers/tv-controller";
import ActorList from "./ActorList/ActorList";
import VideoList from "./VideoList/VideoList";
import {getImage} from "../../utils";

const minsToHours = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

const OVERVIEW = 'overview';
const ACTOR = 'actor';
const VIDEO = 'video';

const ContentPage = ({content, director, actors, content_type}) => {
  const user = useSelector(state => state?.user)
  const {id} = useParams();
  const [userFilmInfo, setUserFilmInfo] = useState(null);

  const title = content_type === 'tv' ? 'name' : 'title';
  const duration = content_type === 'tv' ? minsToHours(content?.episode_run_time[0]) : minsToHours(content?.runtime)
  const production_year = new Date(content_type === 'tv' ? content?.first_air_date : content?.release_date).getFullYear();
  const production_years = content_type === 'tv' ? `${production_year} - ${content?.in_production ? '...' : `${content?.last_air_date?.split('-')[0]}`}` : production_year;


  useEffect(() => {
    if (user.id) {
      switch (content_type) {
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
        default:
      }
    }
  }, [id, user.id, content_type])

  const router = useNavigate()
  const {page} = useParams()

  const redirectToLogin = () => router('/login');

  return (
    <div className='film-page'>
      <div className="container">
        {content ?
          <div className="film-page__film film">
            <div className="film__main">
              <div className="film__poster">
                <img src={getImage(content.poster_path)} alt="Poster" width='300px'/>
              </div>
              <div className="film__info info">
                <div className="info__header">
                  <h1 className='info__title'>
                    {content[title]}
                    <span>({production_years})</span>
                  </h1>
                  <div className="info__row">
                    <div className="info__tagline">
                      {content.tagline}
                    </div>
                  </div>
                  <div className="info__row_start">
                    <div className="info__rating">{content.vote_average} &#9733;</div>
                    {content.adult ?
                      <div className='info__adult'>18+</div>
                      :
                      null
                    }
                    <div className="info__countries">
                      {content.production_countries.map(country => country.iso_3166_1).join(', ')}
                    </div>
                    <div className="info__status"
                         style={{color: content.status === 'Post Production' ? '#d00203' : '#00c803'}}>
                      {content.status}
                    </div>
                  </div>
                </div>

                <div className="info__row">
                  <button className='info__btn'>
                    {userFilmInfo?.isFavourite ?
                      <i onClick={() => removeFavourite(setUserFilmInfo, content.id, user.id, content_type)}
                         className="fas fa-heart"/>
                      :
                      <i
                        onClick={user.isAuth ? () => addFavourite(setUserFilmInfo, content.id, user.id, content_type) : redirectToLogin}
                        className="far fa-heart"/>
                    }
                  </button>
                  <button className='info__btn'>
                    {userFilmInfo?.isLater ?
                      <i onClick={() => removeLater(setUserFilmInfo, content.id, user.id, content_type)}
                         className="fas fa-bookmark"/>
                      :
                      <i
                        onClick={user.isAuth ? () => addLater(setUserFilmInfo, content.id, user.id, content_type) : redirectToLogin}
                        className="far fa-bookmark"/>}
                  </button>
                </div>

                <div className="info__main">
                  {production_year ?
                    <div className="info__row">
                      <span>Production year</span>
                      {production_year}
                      {content_type === 'movie' || ` (${content.number_of_seasons} seasons)`}
                    </div>
                    :
                    null
                  }
                  {
                    content.production_countries[0] ?
                      <div className="info__row">
                        <span>Country</span>
                        {content.production_countries?.map(country => country.name)?.join(', ')}
                      </div>
                      :
                      null
                  }
                  {
                    duration ?
                      <div className="info__row">
                        <span>Duration</span>
                        {duration}
                      </div>
                      :
                      null
                  }
                  {content.genres.length ?
                    <div className="info__row">
                      <span>Genres</span> {content.genres.map(genre => genre.name).join(', ')}
                    </div>
                    :
                    null
                  }
                  {director ?
                    <div className="info__row">
                      <span>Director</span>
                      {
                        director.name ||
                        <TruncatedText str={director?.map(dir => dir.name).join(', ')} n={55}/>
                      }
                    </div>
                    :
                    null
                  }
                  {content.budget ?
                    <div className="info__row">
                      <span>Budget</span> ${content.budget?.toLocaleString()}
                    </div>
                    :
                    null
                  }
                  {
                    content.revenue ?
                      <div className="info__row">
                        <span>Revenue</span> ${content.revenue?.toLocaleString()}
                      </div>
                      :
                      null
                  }
                </div>
              </div>
            </div>

            <div className="film__bottom">
              <div className="film__links">
                <h2 className={page === OVERVIEW ? 'active' : null}>
                  <Link to={`/${content_type}/${content.id}/overview`}>Overview</Link>
                </h2>
                <h2 className={page === ACTOR ? 'active' : null}>
                  <Link to={`/${content_type}/${content.id}/actor`}>Actors</Link>
                </h2>
                <h2 className={page === VIDEO ? 'active' : null}>
                  <Link to={`/${content_type}/${content.id}/video`}>Trailers</Link>
                </h2>
              </div>
              {
                page === OVERVIEW &&
                  <div>
                    <div className="film__description">
                      <TruncatedText str={content.overview} n={300}/>
                    </div>
                    <div className="film__rating">
                      <h2>Film Rating</h2>
                      <div className="rating__row">
                        <Rate avgRating={content.vote_average}
                              content_type={content_type}
                              action={user.isAuth ? rateFilm : redirectToLogin}
                              title={content[title]}
                              setUserFilmInfo={setUserFilmInfo}
                              film_id={content.id}
                              user_id={user.id}
                        />
                        <div className="rating__value">{content.vote_average}</div>
                      </div>
                      {userFilmInfo?.isRated ?
                        <div className="rating__mine">
                          My rating
                          <span style={{background: userFilmInfo.rating < 5 ? 'red' : 'green'}}>{userFilmInfo.rating}</span>
                          <button
                            onClick={() => unRateFilm(setUserFilmInfo, content.id, user.id, content_type)}
                            className="rating__remove"
                          >
                            Remove
                          </button>
                        </div>
                        : null}
                    </div>
                  </div>
              }
              {
                page === ACTOR &&
                <div className="film__actors">
                  <h2>Actors</h2>
                  {actors ? <ActorList actors={actors.slice(0, 5)} className='film__actors-list'/> : ''}
                </div>
              }
              {
                page === VIDEO &&
                  <VideoList className='film__video' content_type={content_type}/>
              }

            </div>
          </div>
          :
          null
        }
      </div>
    </div>
  );
};

export default ContentPage;