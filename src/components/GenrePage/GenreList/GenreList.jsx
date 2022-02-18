import React, {useEffect, useState} from 'react';
import './GenreList.scss';
import GenreColumn from "./GenreColumn/GenreColumn";
import useWindowDimensions from "../../../hooks/useWindowDimensions";
import Button from "../../UI/Button/Button";
import TMDBMovieController from "../../../controllers/tmdb-movie-controller";
import {useParams} from "react-router";
import {useDispatch} from "react-redux";

const GenreList = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genresInColumn, setGenresInColumn] = useState(0)
    const [clear, setClear] = useState(false)
    const {width} = useWindowDimensions();

    const params = useParams()

    useEffect(()=>{
        clearSelectedGenres();
        setGenres([])
    }, [params])

    useEffect(() => {
        if (params.type==='movies'){
            TMDBMovieController.getAllMoviesGenres().then(data => {
                    setGenres(data)
                    setGenresInColumn(Math.ceil(data.length / 3));
                }
            )
        }
        if(params.type==='tvs'){
            TMDBMovieController.getAllTVGenres().then(data => {
                    setGenres(data)
                    setGenresInColumn(Math.ceil(data.length / 3));
                }
            )
        }
        if(params.type==='cartoons'){
            TMDBMovieController.getAllCartoonGenres().then(data => {
                    setGenres(data)
                    setGenresInColumn(Math.ceil(data.length / 3));
                }
            )
        }
    }, [params.type])

    function getGenreColumns(count) {
        return [...new Array(count)]
            .map((_, i) =>
                <GenreColumn
                    genres={genres.slice(genresInColumn*i, genresInColumn*(i+1))}
                    selectedGenres={selectedGenres}
                    clear={clear}
                    setSelectedGenres={setSelectedGenres}
                    key={i}
                />)
    }

    const dispatch = useDispatch()

    const clearSelectedGenres = () => {
        dispatch({type: 'CHANGE_GENRES', payload: []})
        setClear(!clear)
        setSelectedGenres([])
    }

    return genres.length && genresInColumn ? (
        <div className="genre-list">
            <div className="container">
                <div className="genre-list__flex">
                    {width > 700 ?
                        <div className="genre-list__row">
                            {genresInColumn ? getGenreColumns(3) : null}
                        </div>
                        :
                        <div className="genre-list__row">
                            <GenreColumn
                                genres={genres}
                                selectedGenres={selectedGenres}
                                setSelectedGenres={setSelectedGenres}
                                clear={clear}
                            />
                        </div>
                    }
                    <div className='genre-list__bottom'>
                        <Button onClick={() => dispatch({type: 'CHANGE_GENRES', payload: selectedGenres})}>
                            Submit
                        </Button>
                        <Button onClick={clearSelectedGenres}>
                            Clear
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default GenreList;