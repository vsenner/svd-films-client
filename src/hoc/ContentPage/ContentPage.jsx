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
import {getSmallImage} from "../../utils";

const minsToHours = (mins) => `${Math.floor(mins / 60)}h ${mins % 60}m`;

const OVERVIEW = 'overview';
const ACTOR = 'actor';
const VIDEO = 'video';

const ContentPage = ({content, director, actors, content_type}) => {
  const user = useSelector(state => state?.user)
  const {id} = useParams();
  const [userFilmInfo, setUserFilmInfo] = useState(null);

  const title = content_type === 'tv' ? 'name' : 'title';
  const production_year = new Date(content_type === 'tv' ? content?.first_air_date : content?.release_date).getFullYear();
  const production_years = content_type === 'tv' ? `${production_year} - ${content?.in_production ? '...' : `${content?.last_air_date?.split('-')[0]}`}` : production_year;

  const getDuration = (content) =>{
    if(content_type === 'tv'){
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
  }

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
        case 'cartoons':
          MovieController.getUserFilmInfo(id, user.id).then(data => {
            setUserFilmInfo(data)
          })
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
                <img src={getSmallImage(content.poster_path)} alt="Poster" width='300px'/>
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
                    <div className="info__rating"><span className="info__rating_star"/>{content.vote_average}</div>

                    {content.adult ?
                      <div className='info__adult'>18+</div>
                      :
                      null
                    }
                    <div className="info__countries" style={{color: 'white'}}>
                      {content.production_countries.map(country => country.iso_3166_1).join(', ')}
                    </div>
                    <div className="info__status"
                         style={{color: content.status === 'Post Production' ? '#D85757' : '#5AD857'}}>
                      {content.status}
                    </div>
                  </div>
                </div>

                <div className="info__row">
                  <button className='info__btn'>
                    {userFilmInfo?.isFavourite ?
                      <div onClick={() => removeFavourite(setUserFilmInfo, content.id, user.id, content_type)}
                         className="info__filledHeart"/>
                      :
                      <div
                        onClick={user.isAuth ? () => addFavourite(setUserFilmInfo, content.id, user.id, content_type) : redirectToLogin}
                        className="info__emptyHeart"/>
                    }
                  </button>
                  <button className='info__btn'>
                    {userFilmInfo?.isLater ?
                      <div onClick={() => removeLater(setUserFilmInfo, content.id, user.id, content_type)}
                         className="info__filledBookmark"/>
                      :
                      <div
                        onClick={user.isAuth ? () => addLater(setUserFilmInfo, content.id, user.id, content_type) : redirectToLogin}
                        className="info__emptyBookmark"/>}
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
                    getDuration(content) ?
                      <div className="info__row">
                        <span>Duration</span>
                        {getDuration(content)}
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
                        <TruncatedText n={55}>
                          {director?.map(dir => dir.name).join(', ')}
                        </TruncatedText>
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
                <h2 className={page === OVERVIEW ? 'active' : 'unActiveFirst'}>
                  <Link to={`/${content_type}/${content.id}/overview`}>Overview</Link>
                </h2>
                <h2 className={page === ACTOR ? 'active' : 'unActive'}>
                  <Link to={`/${content_type}/${content.id}/actor`}>Actors</Link>
                </h2>
                <h2 className={page === VIDEO ? 'active' : 'unActive'}>
                  <Link to={`/${content_type}/${content.id}/video`}>Trailers</Link>
                </h2>
              </div>
              {
                page === OVERVIEW &&
                <div>
                  <div className="film__description">
                    <div>
                      {content.overview}
                    </div>
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
                        <div className='rating__circle'>
                          <span>
                            {userFilmInfo.rating}
                          </span>
                        </div>
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