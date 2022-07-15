import React, {useEffect, useState} from 'react';
import TmdbMediaController from "../../../controllers/tmdb-media-controller";
import {useParams} from "react-router-dom";
import YoutubeVideo from "../../../components/UI/YoutubeVideo/YoutubeVideo";
import './VideoList.scss'

const VideoList = ({className, content_type}) => {
  const [videos, setVideos] = useState([]);
  const {id, } = useParams();

  useEffect(() => {
    switch (content_type) {
      case 'movie':
        TmdbMediaController.getMovieTrailers(id).then((data) => {
          setVideos(data)
        });
        break;
      default:
        TmdbMediaController.getTVTrailers(id).then((data) => {
          setVideos(data)
        });
    }
  }, [id, content_type])


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