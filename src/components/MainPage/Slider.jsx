import React, {useEffect, useState} from 'react';
import {Swiper} from "swiper/react/swiper";
import "swiper/swiper-bundle.css";
import {Navigation} from "swiper";
import SwiperCore from "swiper";
import {SwiperSlide} from "swiper/react/swiper-react";
import ratingStar from "../../images/star.png"
import {Link} from "react-router-dom";
import TruncatedText from "../UI/TruncatedText/TruncatedText";
import {getImage} from "../../UI/getImage";
import Loader from "../UI/Loader/Loader";
import TMDBMovieController from "../../controllers/tmdb-movie-controller";

SwiperCore.use([Navigation]);

const Slider = () => {
  const [slides, setSlides] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    TMDBMovieController.getPopular().then(resp => {
      setSlides(resp.results.slice(0, 10))
    }).finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [localStorage.lang])

  return loading ?
    <Loader/>
    :
    <Swiper navigation={true} className="mySwiper">
      {slides.map(slide => <SwiperSlide key={slide.id}>
        <div className="slide-background-img">
          <img src={getImage(slide.backdrop_path)} alt=""/>
        </div>
        <div className="info-block">
          <Link to={`/movie/${slide.id}/overview`} className="info-block__film-poster">
            <img src={getImage(slide.poster_path)}
                 alt=""/>
          </Link>
          <div className="text-block">
            <div className="text-block__film-title">
              <Link to={`/movie/${slide.id}/overview`} className="text-block__link">
                {slide.title}
              </Link>
              {slide.vote_average === 0 ? '' : <div className="text-block__rating">
                <span>{slide.vote_average}</span>
                <img className="text-block__rating-star-img" src={ratingStar} alt=""/>
              </div>}

              <div className="text-block__description">
                <TruncatedText str={slide.overview} n={200} path={`/movie/${slide.id}/overview`}/>
              </div>
            </div>
          </div>
        </div>
      </SwiperSlide>)}
    </Swiper>
};

export default Slider;