import React, {useEffect, useState} from 'react';
import UserMediaList from "../UserPage/UserMediaList/UserMediaList";
import {Link, useParams} from "react-router-dom";
import {useSort} from "../../hooks/useSort";
import UserController from "../../controllers/user-controller";
import {useSelector} from "react-redux";
import {getMediaList} from "./utils";

// eslint-disable-next-line
const ASCENDING = false;
const DESCENDING = true;

const IndividualMediaPage = () => {

  const {id, username} = useSelector(state => state?.user);

  const [mediaList, setMediaList] = useState(null)
  const [sortMethod, setSortMethod] = useState({field: null, method: DESCENDING});
  const [localUsername, setLocalUsername] = useState(username);

  const {user_id, media_type, type} = useParams();

  const sortedMediaList = useSort(mediaList, sortMethod);

  useEffect(() => {
    getMediaList(user_id, media_type, type).then(list => {
      console.log('LIST - ', list);
      setMediaList(list);
    });
  }, [user_id, media_type, type]);

  useEffect(() => {
    if (user_id !== id) {
      UserController.getUserInfo(id).then(user => setLocalUsername(user.username));
    }
  }, [user_id, id]);

  const sortBy = (field) => {
    if (sortMethod.field === field) {
      return setSortMethod({...sortMethod, method: !sortMethod.method});
    }
    return setSortMethod({field, method: DESCENDING});
  }

  return (
    <div className='list-page'>
      <div className='list-page__container'>
        <h1 className='list-page__title'>{localUsername}`s {type} {media_type === 'tv' ? "tv's" : "movie's"}</h1>
        <div className="list-page__choose-type">
          <Link to={`/user/${user_id}/tv/${type}`}>TV</Link>
          <Link to={`/user/${user_id}/movie/${type}`}>Movie</Link>
        </div>

        {mediaList?.length ?
          <div>
            <div className="list-page__sort">
              <div className="list-page__sort-by">
                Sort by:
              </div>
              <button className="list-page__sort-item" onClick={() => sortBy('time')}>
                date
              </button>
              <button className="list-page__sort-item" onClick={() => sortBy('title')}>
                {media_type === 'tv' ? "tv" : "movie"} name
              </button>
              <button className="list-page__sort-item" onClick={() => sortBy('year')}>
                year
              </button>
              <button className="list-page__sort-item" onClick={() => sortBy('rating')}>
                tmdb rating
              </button>
            </div>
            <UserMediaList
              list={sortedMediaList}
              media_type={media_type}
            />
          </div>
          :
          <h2 className='list-page__title'>
            {media_type === 'tv' ? `No ${type} tv's yet` : `No ${type} movie's yet`}
          </h2>
        }

      </div>

    </div>
  );
};

export default IndividualMediaPage;