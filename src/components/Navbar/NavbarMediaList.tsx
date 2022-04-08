import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {getImage} from "../../utils";
import {IMovie, ITv, mediaTypes} from "../../models/media";
import './NavbarMediaList.scss'

interface Iprops {
  media_list: IMovie[] | ITv[],
  media_type: mediaTypes
  afterRedirect?: () => void;
}

const NavbarMediaList: FC<Iprops> = ({media_list, media_type, afterRedirect}) => {
  return (
    <div className='navbar__dropdown-list dropdown-list'>
      {media_list.map(media => {
          let title, year;
          if ("title" in media && "release_date" in media) {
            title = media.title
            year = media?.release_date?.split('-')[0]
          } else {
            title = media.name;
            year = media?.first_air_date?.split('-')[0]
          }
          return (
            <Link key={media.id}
                  className='dropdown-list__item'
                  to={`/${media.media_type || media_type}/${media.id}/overview`}
                  onClick={() => afterRedirect ? afterRedirect() : null}
            >
              <div className="dropdown-list__left">
                <div className='dropdown-list__image'>
                  <img
                    src={media.poster_path
                      ?
                      getImage(media.poster_path)
                      : 'https://i.ibb.co/3F9kRkx/no-poster.png'
                    }
                    alt={title}/>
                </div>
              </div>
              <div className="dropdown-list__right">
                <p className='dropdown-list__title'>
                  {title}
                </p>
                <p className='dropdown-list__subtitle'>
                  {year}
                </p>
              </div>
            </Link>
          )
        }
      )}
    </div>
  );
};

export default NavbarMediaList;