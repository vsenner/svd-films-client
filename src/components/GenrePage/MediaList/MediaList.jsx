import React, {useEffect, useState} from 'react';
import './MediaList.scss'
import TMDBMovieController from "../../../controllers/tmdb-movie-controller";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import MediaItem from './MediaItem/MediaItem'
import UpButton from "../../UI/UpButton/UpButton";

const POPULARITY = 'popularity';
const VOTE_AVERAGE = 'vote_average';
const RELEASE_DATE = 'primary_release_date';

const MediaList = () => {
  const [mediaList, setMediaList] = useState([])
  const selectedGenres = useSelector((state) => state.movies.genres)
  const [currentPage, setCurrentPage] = useState(1);
  const [requestStatus, setRequestStatus] = useState(true);
  const handleScroll = (e) => {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200) setRequestStatus(true)
  };

  const {media_type, query, sort_method} = useParams()

  useEffect(() => {
    setCurrentPage(1)
    setRequestStatus(true)
    setMediaList([])
  }, [selectedGenres, media_type, query, sort_method])

  useEffect(() => {
    const sortMethod = sort_method + '.desc'
    if (requestStatus) {
      if (media_type === 'movie') {
        TMDBMovieController.getMoviesWithGenres([...selectedGenres, {
          id: 16,
          select: false
        }], sortMethod, currentPage)
          .then((data) => {
              setMediaList([...mediaList, ...data.results])
              setCurrentPage(prev => prev + 1)
              setRequestStatus(false)
            }
          )
      }
      if (media_type === 'tv') {
        TMDBMovieController.getSeriesWithGenres(selectedGenres, sortMethod, currentPage)
          .then((data) => {
              setMediaList([...mediaList, ...data.results])
              setCurrentPage(prev => prev + 1)
              setRequestStatus(false)
            }
          )
      }
      if (media_type === 'cartoons') {
        TMDBMovieController.getMoviesWithGenres([...selectedGenres, {
          id: 16,
          select: true
        }], sortMethod, currentPage)
          .then((data) => {
              setMediaList([...mediaList, ...data.results])
              setCurrentPage(prev => prev + 1)
              setRequestStatus(false)
            }
          )
      }
      if (query) {
        TMDBMovieController.search(query, sort_method, currentPage).then(data => {
          if (data.total_pages >= currentPage) {
            setMediaList([...mediaList, ...data.results]);
            setCurrentPage(prev => prev + 1)
          }
          setRequestStatus(false)
        })
      }
    }
  }, [selectedGenres, media_type, sort_method, requestStatus, query, currentPage, mediaList])

  console.log(mediaList)

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return function () {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className='media-list'>
      <div className='media-list__buttons'>
        <Link
          to={`/genres/${media_type ?? `search/${query}`}/${POPULARITY}`}
          className={sort_method === POPULARITY ? 'active' : null}
        >
          Most popular
        </Link>
        <Link
          to={`/genres/${media_type ?? `search/${query}`}/${VOTE_AVERAGE}`}
          className={sort_method === VOTE_AVERAGE ? 'active' : null}
        >
          Best rated
        </Link>
        <Link
          to={`/genres/${media_type ?? `search/${query}`}/${RELEASE_DATE}`}
          className={sort_method === RELEASE_DATE ? 'active' : null}
        >
          Release date
        </Link>
      </div>
      <div className='film-grid'>
        {
          mediaList?.map(media =>
              <MediaItem
                key={media.id}
                poster_path={media.poster_path}
                original_title={media.original_title}
                name={media_type === 'series' || media_type === 'tv' ? media.name : media.title}
                id={media.id}
                type={media.title ? 'movie' : 'tv'}
                year={new Date(media_type === 'tv' ? media.first_air_date : media.release_date).getFullYear()}
              />
          )
        }
      </div>
      <UpButton/>
    </div>

  );
};

export default MediaList;