import React, {useEffect, useRef, useState} from 'react';
import './MediaList.scss'
import TmdbMediaController from "../../../controllers/tmdb-media-controller";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import MediaItem from './MediaItem/MediaItem'
import UpButton from "../../UI/UpButton/UpButton";
import {sortMethods} from "../../../models/sortMethods";
import {mediaTypes} from "../../../models/media";
import Loader from "../../UI/Loader/Loader";


const MediaList = () => {
  const [mediaList, setMediaList] = useState([])
  const selectedGenres = useSelector((state) => state?.movies.genres)
  const [currentPage, setCurrentPage] = useState(1);

  const [isLoading, setIsLoading] = useState(false);

  const {media_type, query, sort_method} = useParams()

  const loadingRef = useRef();

  const setMediaData = (data) => {
    setMediaList(prev => [...prev, ...data.results])
    setIsLoading(false);
  }

  const fetchMediaList = () => {
    const sortMethod = sort_method + '.desc'
    setIsLoading(true)
    if (media_type === 'movie' && !query) {
      TmdbMediaController.getMoviesWithGenres([...selectedGenres, {
        id: 16,
        select: false
      }], sortMethod, currentPage)
        .then(setMediaData)
    }
    if (media_type === 'tv' && !query) {
      TmdbMediaController.getSeriesWithGenres(selectedGenres, sortMethod, currentPage)
        .then(setMediaData)
    }
    if (media_type === 'cartoons' && !query) {
      TmdbMediaController.getMoviesWithGenres([...selectedGenres, {
        id: 16,
        select: true
      }], sortMethod, currentPage)
        .then(setMediaData)
    }
    if (query && media_type) {
      TmdbMediaController.search(query, media_type, sort_method, currentPage, media_type).then(data => {
        if (data.total_pages >= currentPage) {
          setMediaList(prev => [...prev, ...data.list]);
          setIsLoading(false);
        }
      })
    }
  }

  useEffect(() => {
    let observer;
    let observerRefValue = null;
    const callback = (entries) => {
      if (!isLoading && entries[0].isIntersecting) {
        setCurrentPage(prev => prev + 1)
      }
    }
    if (loadingRef) {
      observer = new IntersectionObserver(callback)
      observer.observe(loadingRef.current);
    }
    if (loadingRef.current) {
      observer.unobserve(loadingRef.current);
      observerRefValue = loadingRef.current;
    }
    return () => {
      if (observerRefValue)
        observer.unobserve(observerRefValue);
    }

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    fetchMediaList();
    // eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    setIsLoading(true)
    setMediaList([]);
  }, [selectedGenres, media_type, sort_method, query])

  return (
    <div className='media-list'>
      <div className='media-list__buttons'>
        <Link
          to={`/genres/${query ? `search/` : ''}${media_type}/${query ? `${query}/` : ''}${sortMethods.POPULARITY}`}
          className={sort_method === sortMethods.POPULARITY ? 'active' : null}
        >
          Most popular
        </Link>
        <Link
          to={`/genres/${query ? `search/` : ''}${media_type}/${query ? `${query}/` : ''}${sortMethods.VOTE_AVERAGE}`}
          className={sort_method === sortMethods.VOTE_AVERAGE ? 'active' : null}
        >
          Best rated
        </Link>
        <Link
          to={`/genres/${query ? `search/` : ''}${media_type}/${query ? `${query}/` : ''}${sortMethods.PRIMARY_RELEASE_DATE}`}
          className={sort_method === sortMethods.PRIMARY_RELEASE_DATE ? 'active' : null}
        >
          Release date
        </Link>
      </div>
      {
        isLoading ?
          <Loader/>
          :
          mediaList.length ?
            <div className='film-grid'>
              {mediaList.map(media => {
                const type = media_type === mediaTypes.ALL ? media.media_type : media_type
                return (
                  <MediaItem
                    key={media.id}
                    poster_path={media.poster_path ?? null}
                    original_title={media.original_title}
                    name={type === 'tv' ? media.name : media.title}
                    id={media.id}
                    type={type}
                    year={new Date(type === mediaTypes.TV ? media.first_air_date : media.release_date).getFullYear()}
                    countries={media.country}
                  />)
              })}
            </div>
            :
            <h2 className="media-list__no-such-films">No such films found ;(</h2>
      }
      <div className="media-list__loading" ref={loadingRef}/>
      <UpButton/>
    </div>

  );
};

export default MediaList;