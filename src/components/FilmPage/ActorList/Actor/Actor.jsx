import React from 'react';
import './Actor.scss'
import MovieController from "../../../../controllers/movie.controller";

const Actor = ({actor}) => {
  return (
    <div className='actor'>
      <img src={MovieController.getImage(actor.profile_path)} alt={actor.name} className='actor__photo'/>
      <div className="actor__name">
        {actor.name}
      </div>
    </div>
  );
};

export default Actor;