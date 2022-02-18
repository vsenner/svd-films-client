import React, {useEffect, useState} from 'react';
import './FilmList.scss'
import TMDBMovieController from "../../../controllers/tmdb-movie-controller";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import FilmItem from './FilmItem/FilmItem'
import UpButton from "../../UI/UpButton/UpButton";
import posterPlaceholder from '../../../images/film-poster-placeholder.png'

const FilmList = () => {
    const [filmList, setFilmList] = useState([])
    const params = useParams()
    const selectedGenres = useSelector((state) => state.movies.genres)
    const [currentPage, setCurrentPage] = useState(1);
    const [requestStatus, setRequestStatus] = useState(true);
    const handleScroll = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200)
          setRequestStatus(true)
    };

    useEffect(()=>{
         setCurrentPage(1)
         setRequestStatus(true)
         setFilmList([])
    },[selectedGenres, params])

    useEffect(() => {
        const sortMethod = params.sortMethod + '.desc'
        if(requestStatus){
            if (params.type === 'movies') {
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
            if (params.type === 'tvs') {
                TMDBMovieController.getSeriesWithGenres(selectedGenres, sortMethod, currentPage)
                    .then((data) => {
                            setFilmList([...filmList, ...data.results])
                            setCurrentPage(prev => prev + 1)
                            setRequestStatus(false)
                        }
                    )
            }
            if (params.type === 'cartoons') {
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
            if (params.query) {
              TMDBMovieController.search(params.query, params.sortMethod, currentPage).then(data => {
                console.log(data)
                if(data.total_pages >= currentPage) {
                  setFilmList([...filmList, ...data.results]);
                  setCurrentPage(prev => prev + 1)
                }
                setRequestStatus(false)
              })
            }
        }
    }, [params.type, params.sortMethod, requestStatus])


  console.log(currentPage, 'currentPage')

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return function () {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div className='genres'>
            <div className="container">
              <div className='genres__buttons'>
                <Link to={`/genres/${params.type || `search/${params.query}`}/popularity`}>Most popular</Link>
                <Link to={`/genres/${params.type || `search/${params.query}`}/vote_average`}>Best rated</Link>
                <Link to={`/genres/${params.type || `search/${params.query}`}/primary_release_date`}>Release date</Link>
              </div>
              <div className='genres__film-list'>
                {
                  filmList ? filmList.map(film =>
                    <div key={film.id}>
                      <FilmItem
                        poster = {film.poster_path ? `https://image.tmdb.org/t/p/w185/${film.poster_path}` : posterPlaceholder}
                        film_id = {film.id}
                        film_type = {
                          params.type?.slice(0, -1) || film.media_type
                        }
                        film_name = {
                          params.type === 'tvs' ?
                            film.name :
                            params.query ?
                              film.media_type === 'tv' ?
                                film.name
                                :
                                film.title
                              :
                              film.title
                        }
                      />

                    </div>
                  ) : null
                }
              </div>
              <UpButton/>
            </div>
        </div>

    );
};

export default FilmList;