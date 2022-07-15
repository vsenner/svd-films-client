import React, {FC, useEffect, useState} from 'react';
import './TruncatedText.scss'
import {Link} from "react-router-dom";

interface IProps {
  children: any,
  n?: number,
  path?: string,
  moreSymbol?: any
}

const TruncatedText: FC<IProps> = ({children, n = 150, path = null, moreSymbol = 'MORE'}) => {
  const [string, setString] = useState<string>(children);

  useEffect(() => {
    setString(truncate(string, n))
    // eslint-disable-next-line
  }, [])

  function truncate(str: string, n: number): string {
    str = str.substring(0, n - n / 10);
    return str.substring(0, str.lastIndexOf(' '));
  }

  const buttonHandler = () => setString(children);

  if (children.length <= n) return (<span>{children}</span>);

  return (
    <div>
      {string}
      {string !== children ?
        path ?
          <Link
            to={path}
            className='show_more'>
            {moreSymbol}
          </Link>
          :
          <button
            onClick={buttonHandler}
            className='show_more'
          >
            {moreSymbol}
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