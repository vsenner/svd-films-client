import React, {useEffect, useState} from 'react';
import './MediaList.scss'
import TMDBMovieController from "../../../controllers/tmdb-movie-controller";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import MediaItem from './MediaItem/MediaItem'
import UpButton from "../../UI/UpButton/UpButton";

const MediaList = () => {
    const [filmList, setFilmList] = useState([])
    const selectedGenres = useSelector((state) => state.movies.genres)
    const [currentPage, setCurrentPage] = useState(1);
    const [requestStatus, setRequestStatus] = useState(true);
    const handleScroll = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200) setRequestStatus(true)
    };

  const {media_type, query, sort_method} = useParams()

    useEffect(()=>{
         setCurrentPage(1)
         setRequestStatus(true)
         setFilmList([])
    },[selectedGenres, media_type, query, sort_method])

    useEffect(() => {
        const sortMethod = sort_method + '.desc'
        if(requestStatus){
            if (media_type === 'movie') {
                TMDBMovieController.getMoviesWithGenres([...selectedGenres, {
                    id: 16,
                    select: false
                }], sortMethod, currentPage)
                    .then((data) => {
                            setFilmList([...filmList, ...data.results])
                            setCurrentPage(prev => prev + 1)
                            setRequestStatus(false)
                        }
                    )
            }
            if (media_type === 'tv') {
                TMDBMovieController.getSeriesWithGenres(selectedGenres, sortMethod, currentPage)
                    .then((data) => {
                            setFilmList([...filmList, ...data.results])
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
                            setFilmList([...filmList, ...data.results])
                            setCurrentPage(prev => prev + 1)
                            setRequestStatus(false)
                        }
                    )
            }
          if (query) {
            TMDBMovieController.search(query, sort_method, currentPage).then(data => {
              console.log(data)
              if(data.total_pages >= currentPage) {
                setFilmList([...filmList, ...data.results]);
                setCurrentPage(prev => prev + 1)
              }
              setRequestStatus(false)
            })
          }
        }
    }, [selectedGenres, media_type, sort_method,requestStatus, query, currentPage, filmList])


    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return function () {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className='media-list'>
            <div className="container">
              <div className='buttons'>
                <Link to={`/genres/${media_type ?? `search/${query}`}/popularity`}>Most popular</Link>
                <Link to={`/genres/${media_type ?? `search/${query}`}/vote_average`}>Best rated</Link>
                <Link to={`/genres/${media_type ?? `search/${query}`}/primary_release_date`}>Release date</Link>
              </div>
              <div className='film-grid'>
                {
                  filmList ? filmList.map(film =>
                    <div key={film.id}>
                      <MediaItem
                        poster_path={film.poster_path}
                        original_title={film.original_title}
                        name={
                          media_type === 'series' || media_type === 'tv' ? film.name : film.title
                        }
                        id={film.id}
                        type={film.title ? 'movie' : 'tv'}
                      />

                    </div>
                  ) : null
                }
              </div>
            </div>
            <UpButton/>
        </div>

    );
};

export default MediaList;