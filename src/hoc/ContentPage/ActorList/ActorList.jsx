import React from 'react';
import './ActorList.scss'
import Actor from "./Actor/Actor";

const ActorList = ({actors, ...props}) => {
  const classes = `actor-list ${props.className}`
  return actors ? (
    <div className={classes}>
      {actors.map(actor => <Actor key={actor.id} profile_path={actor.profile_path} name={actor.name}/>)}
    </div>
  ) : '';
};

export default ActorList;