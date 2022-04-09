import React from 'react';
import './ActorList.scss'
import Actor from "./Actor/Actor";

const ActorList = ({actors, className}) => {
  const classes = `actor-list ${className}`
  return actors ? (
    <div className={classes}>
      {actors.map(actor => <Actor key={actor.id} profile_path={actor.profile_path} name={actor.name}/>)}
    </div>
  ) : '';
};

export default ActorList;