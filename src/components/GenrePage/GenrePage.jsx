import './GenrePage.scss'
import GenreList from "./GenreList/GenreList";
import MediaList from "./MediaList/MediaList";

const GenrePage = () => {

  return (
    <div className='genre-page'>
      <div className="container">
        <GenreList />
        <MediaList />
      </div>
    </div>
  );
};

export default GenrePage;

