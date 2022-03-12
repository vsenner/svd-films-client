import React, {useEffect, useState} from 'react';
import TMDBMovieController from "../../../controllers/tmdb-movie-controller";
import {useParams} from "react-router-dom";
import YoutubeVideo from "../../../components/UI/YoutubeVideo/YoutubeVideo";
import './VideoList.scss'

const VideoList = ({className, content_type}) => {
  const [videos, setVideos] = useState([]);
  const {id, } = useParams();

  useEffect(() => {
    switch (content_type) {
      case 'movie':
        TMDBMovieController.getMovieTrailers(id).then((data) => {
          setVideos(data)
        });
        break;
      default:
        TMDBMovieController.getTVTrailers(id).then((data) => {
          setVideos(data)
        });
    }
  }, [id])


  return (
    <div className={className}>
      {videos.map(video =>
        <div className='video'>
          <h2>{video.name}</h2>
          <YoutubeVideo id={video.key}/>
        </div>)}
    </div>
  );
};

export default VideoList;