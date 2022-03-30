import React from 'react';
import {Link} from "react-router-dom";
import {getImage} from "../../utils";
const NavbarMediaList = ({media_list, clearFilms, media_type}) => {


  return (
    <div className={'navbar__media-list'}>
      {media_list.map(media =>
        <Link key={media.id}
              className={'navbar__media-list__item'}
              to={`/${media_type}/${media.id}/overview`}
              onClick={() => clearFilms('')}
        >

          <img className={'navbar__media-list__item_img'}
               src={media.poster_path
                 ?
                 getImage(media.poster_path)
                 : 'https://i.ibb.co/3F9kRkx/no-poster.png'
               }
               alt={media.id}/>
          <p className={'navbar__media-list__item_title'}>
            {media_type === 'movie' ? media.original_title : media.name}
          </p>

        </Link>
      )}
    </div>
  );
};

export default NavbarMediaList;