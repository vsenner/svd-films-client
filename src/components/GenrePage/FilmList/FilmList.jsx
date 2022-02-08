import React, {useEffect, useState} from 'react';
import './FilmList.scss'
import TMDBMovieController from "../../../controllers/tmdb-movie-controller";
import {Link, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import FilmItem from './FilmItem/FilmItem'
import UpButton from "../../UI/UpButton/UpButton";

const FilmList = () => {
    const [filmList, setFilmList] = useState([])
    const params = useParams()
    const selectedGenres = useSelector((state) => state.movies.genres)
    const [currentPage, setCurrentPage] = useState(1);
    const [requestStatus, setRequestStatus] = useState(true);
    const handleScroll = (e) => {
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 200) setRequestStatus(true)
    };

    useEffect(() => {
        setCurrentPage(1)
        const sortMethod = params.sortMethod + '.desc'
        if (params.type === 'movies') {
            TMDBMovieController.getMoviesWithGenres([...selectedGenres, {
                id: 16,
                select: false
            }], sortMethod, currentPage)
                .then((data) => {
                        setFilmList(data.results)
                    }
                ).finally(() => {
                    setCurrentPage(currentPage + 1)
                    setRequestStatus(false)
                }
            )
        }
        if (params.type === 'series') {
            TMDBMovieController.getSeriesWithGenres(selectedGenres, sortMethod, currentPage)
                .then((data) => {
                        setFilmList(data.results)
                    }
                ).finally(() => {
                    setCurrentPage(currentPage + 1)
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
                        setFilmList(data.results)
                    }
                ).finally(() => {
                    setCurrentPage(currentPage + 1)
                    setRequestStatus(false)
                }
            )
        }
    }, [selectedGenres, params.type, params.sortMethod])

    useEffect(() => {
        if (requestStatus) {
            const sortMethod = params.sortMethod + '.desc'
            setCurrentPage(1)
            if (params.type === 'movies') {
                TMDBMovieController.getMoviesWithGenres([...selectedGenres, {
                    id: 16,
                    select: false
                }], sortMethod, currentPage)
                    .then((data) => {
                            setFilmList([...filmList, ...data.results])
                        }
                    ).finally(() => {
                        setCurrentPage(currentPage + 1)
                        setRequestStatus(false)
                    }
                )
            }
            if (params.type === 'series') {
                TMDBMovieController.getSeriesWithGenres(selectedGenres, sortMethod, currentPage)
                    .then((data) => {
                            setFilmList([...filmList, ...data.results])
                        }
                    ).finally(() => {
                        setCurrentPage(currentPage + 1)
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
                        }
                    ).finally(() => {
                        setCurrentPage(currentPage + 1)
                        setRequestStatus(false)
                    }
                )
            }

        }

    }, [selectedGenres, params.type, params.sortMethod, requestStatus])

    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        return function () {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <div>
            <div className='buttons'>
                <Link to={`/genres/${params.type}/popularity`}>Most popular</Link>
                <Link to={`/genres/${params.type}/vote_average`}>Best rated</Link>
                <Link to={`/genres/${params.type}/primary_release_date`}>Release date</Link>
            </div>
            <div className='filmGrid'>
                {
                    filmList ? filmList.map(film =>
                        <div key={film.id}>
                            <FilmItem poster_path={film.poster_path}
                                      original_title={film.original_title}
                                      film_name={params.type === 'series' || params.type === 'tv' ? film.name : film.title}/>

                        </div>
                    ) : null
                }
            </div>
            <UpButton/>
        </div>

    );
};

export default FilmList;