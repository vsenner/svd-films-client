import './GenrePage.scss'
import GenreList from "./GenreList/GenreList";
import MediaList from "./MediaList/MediaList";
import {useState} from "react";

const GenrePage = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

  return (
    <div className='genre-page' style={{backgroundImage: `url("${backgroundImage}")`}}>
      <div className="container">
        <GenreList />
        <MediaList setBackgroundImage={setBackgroundImage}/>
      </div>
    </div>
  );
};

export default GenrePage;

