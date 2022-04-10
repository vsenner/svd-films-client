import React, {useEffect, useState} from 'react';
import './TruncatedText.scss'
import {Link} from "react-router-dom";

const TruncatedText = ({children, n = 150, path = null}) => {
  const [string, setString] = useState(children);

  useEffect(() => {
    setString(truncate(string, n))
    // eslint-disable-next-line
  }, [])

  function truncate(str, n) {
    str = str.substring(0, n - n / 10);
    return str.substring(0, str.lastIndexOf(' '));
  }

  const buttonHandler = () => setString(children);

  if(!children) return null;
  if (children.length <= n) return (<span>{children}</span>);
  return (
    <div>
      {string}
      {string !== children ?
        path ?
          <Link
            to={path}
            className='show_more'>
            MORE
          </Link>
          :
          <button
            onClick={buttonHandler}
            className='show_more'>
            MORE
          </button>
        :
        <button
          onClick={() => setString(truncate(children, n))}
          className='show_more'>
          LESS
        </button>}
    </div>
  );
};

export default TruncatedText;