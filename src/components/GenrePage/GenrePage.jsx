import './GenrePage.scss'
import GenreList from "./GenreList/GenreList";
import MediaList from "./MediaList/MediaList";

const GenrePage = () => {

  return (
    <div>
      <GenreList />
      <MediaList />
    </div>
  );
};

export default GenrePage;

