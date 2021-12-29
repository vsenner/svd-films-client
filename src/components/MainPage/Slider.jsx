import React, {useEffect, useState} from 'react';
import {Swiper} from "swiper/react/swiper";
import MovieController from "../../controllers/movie.controller";
import "swiper/swiper-bundle.css";
import {Navigation} from "swiper";
import SwiperCore from "swiper";
import {SwiperSlide} from "swiper/react/swiper-react";
import ratingStar from "../../images/star.png"
import {Link} from "react-router-dom";
import TruncatedText from "../UI/TruncatedText/TruncatedText";
SwiperCore.use([Navigation]);

const Slider = () => {
    const [slides, setSlides] = useState([])
    useEffect(() => {
        MovieController.getPopular().then(resp => {
            console.log(resp)
            setSlides(resp.results.slice(0, 10))
        });

    }, [])



    return slides.length > 9 ?
        <Swiper navigation={true} className="mySwiper">
            {slides.map(slide => <SwiperSlide key={slide.id}>
                <div className="slide-background-img">
                    <img src={`https://image.tmdb.org/t/p/w500/${slide.backdrop_path}`} alt=""/>
                </div>
                <div className="info-block">
                    <Link to={`/film/${slide.id}`} className="info-block__film-poster">
                        <img src={`https://image.tmdb.org/t/p/w500/${slide.poster_path}`}
                             alt=""/>
                    </Link>
                    <div className="text-block">
                        <div className="text-block__film-title">
                            <Link to={`/film/${slide.id}`} className="text-block__link">
                                {slide.original_title}
                            </Link>
                            {slide.vote_average === 0 ? '' : <div className="text-block__rating">
                                <span>{slide.vote_average}</span>
                                <img className="text-block__rating-star-img" src={ratingStar} alt=""/>
                            </div>}

                            <div className="text-block__description">
                                <TruncatedText str={slide.overview} n={200} path={`/film/${slide.id}`}/>
                            </div>
                        </div>
                    </div>
                </div>
            </SwiperSlide>)}
        </Swiper>
        :
        null
};

export default Slider;