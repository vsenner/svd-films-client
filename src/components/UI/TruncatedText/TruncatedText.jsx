import React, {useEffect, useState} from 'react';
import './TruncatedText.scss'
import {Link} from "react-router-dom";

const TruncatedText = ({str, n = 150, path}) => {
  const [string, setString] = useState(str);

  useEffect(() => {
    setString(truncate(string, n))
    // eslint-disable-next-line
  }, [])

  function truncate(str, n) {
    str = str.substring(0, n - n / 10);
    return str.substring(0, str.lastIndexOf(' '));
  }

  const buttonHandler = () => setString(str);

  if (str.length <= n) return (<span>{str}</span>);
  return (
    <span>
      {string}
      {string !== str ?
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
          onClick={() => setString(truncate(str, n))}
          className='show_more'>
          LESS
        </button>}
    </span>
  );
};

export default TruncatedText;