import React, {useEffect, useState} from 'react';
import {Swiper} from "swiper/react/swiper";
import MovieController from "../../controllers/movie.controller";
import "swiper/swiper-bundle.css";
import {Navigation} from "swiper";
import SwiperCore from "swiper";
import {SwiperSlide} from "swiper/react/swiper-react";

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
            {slides.map(slide => <SwiperSlide key={slide.id} style={{height: `calc(100vh - 67px)`}}>
                <div className="slide-background-img">
                    <img src={`https://image.tmdb.org/t/p/w500/${slide.backdrop_path}`} alt=""/>
                </div>

                <div className="info-block">
                    <div className="info-block__film-poster">
                        <img src={`https://image.tmdb.org/t/p/w500/${slide.poster_path}`}
                             alt=""/>
                    </div>

                    <div className="info-block__film-title">
                    </div>

                    <div className="info-block__description">

                    </div>
                </div>
            </SwiperSlide>)}
        </Swiper>
        :
        null
};

export default Slider;