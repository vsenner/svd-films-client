import React from 'react';
import './Actor.scss'
import {getImage} from "../../../../utils";

const Actor = ({profile_path, name}) => {
  return (
    <div className='actor'>
      <img src={profile_path ? getImage(profile_path) : 'https://static.tildacdn.com/tild3035-3530-4839-a234-326238363638/no-photo-man.png'} alt={name} className='actor__photo'/>
      <div className="actor__name">
        {name}
      </div>
    </div>
  );
};

export default Actor;