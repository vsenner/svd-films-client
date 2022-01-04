import React from 'react';
import './Actor.scss'
import {getImage} from "../../../../UI/getImage";

const Actor = ({profile_path, name}) => {
  return (
    <div className='actor'>
      <img src={getImage(profile_path)} alt={name} className='actor__photo'/>
      <div className="actor__name">
        {name}
      </div>
    </div>
  );
};

export default Actor;