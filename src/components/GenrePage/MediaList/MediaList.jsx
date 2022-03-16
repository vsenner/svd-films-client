import React, {useEffect, useRef, useState} from 'react';
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
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const {media_type, query, sort_method} = useParams()

  const loadingRef = useRef();

  const fetchMediaList = () => {
    const sortMethod = sort_method + '.desc'
    if (!isLoading) {
      setIsLoading(true);
      document.title = `${process.env.REACT_APP_PROJECT_NAME} - ${sort_method === POPULARITY ? 'Popular' : sort_method === VOTE_AVERAGE ? 'Best' : sort_method === RELEASE_DATE ? 'Recent' : ''}`
      if (media_type === 'movie') {
        document.title += ` Movies`;
        TMDBMovieController.getMoviesWithGenres([...selectedGenres, {
          id: 16,
          select: false
        }], sortMethod, currentPage)
          .then((data) => {
              setMediaList(prev => [...prev, ...data.results])
              setIsLoading(false);
            }
          )
      }
      if (media_type === 'tv') {
        document.title += ` Series`;
        TMDBMovieController.getSeriesWithGenres(selectedGenres, sortMethod, currentPage)
          .then((data) => {
              setMediaList(prev => [...prev, ...data.results])
              setIsLoading(false);
            }
          )
      }
      if (media_type === 'cartoons') {
        document.title += ` Cartoons`;
        TMDBMovieController.getMoviesWithGenres([...selectedGenres, {
          id: 16,
          select: true
        }], sortMethod, currentPage)
          .then((data) => {
              setMediaList(prev => [...prev, ...data.results])
              setIsLoading(false);
            }
          )
      }
      if (query) {
        document.title = `${process.env.REACT_APP_PROJECT_NAME} - "${query}"`;
        TMDBMovieController.search(query, sort_method, currentPage).then(data => {
          if (data.total_pages >= currentPage) {
            setMediaList(prev => [...prev, ...data.results]);
            setIsLoading(false);
          }
        })
      }
    }
  }

  useEffect(() => {
    const callback = (entries) => {
      if (!isLoading && entries[0].isIntersecting) {
        setCurrentPage(prev => prev + 1)
      }
    }
    const observer = new IntersectionObserver(callback)
    observer.observe(loadingRef.current);
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(currentPage > 0) {
      fetchMediaList();
    }
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(0);
    setMediaList([]);
    return () => document.title = process.env.REACT_APP_PROJECT_NAME;
  }, [selectedGenres, media_type, sort_method, query])


  console.log(currentPage)

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
          mediaList?.map(media => {
              const type = media_type ? (media_type === 'tv' ? 'tv' : 'movie') : (media.media_type === 'tv' ? 'tv' : 'movie')
              return (
                <MediaItem
                  key={media.id}
                  poster_path={media.poster_path}
                  original_title={media.original_title}
                  name={type === 'tv' ? media.name : media.title}
                  id={media.id}
                  type={media.title ? 'movie' : 'tv'}
                  year={new Date(type === 'tv' ? media.first_air_date : media.release_date).getFullYear()}
                />)
            }
          )
        }
      </div>
      <div className="media-list__loading" ref={loadingRef}/>
      <UpButton/>
    </div>

  );
};

export default MediaList;