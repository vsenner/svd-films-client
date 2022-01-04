import React, {useEffect, useMemo, useState} from 'react';
import './LanguageDropDown.scss'

const languages = [
  {id: 0, name: 'Русский', shortname: 'RU', flag: 'https://www.worldometers.info/img/flags/rs-flag.gif'},
  {id: 1, name: 'English', shortname: 'EN', flag: 'https://www.worldometers.info/img/flags/us-flag.gif'},
  {id: 2, name: 'Українська', shortname: 'UA', flag: 'https://www.worldometers.info/img/flags/up-flag.gif'}
]

const LanguageDropDown = () => {
  const selectedLang = useMemo(() => localStorage.getItem('lang'), [localStorage.lang])
  const [showDropDown, setShowDropDown] = useState(false)

  useEffect(() => {
    document.addEventListener('click', (e) => {
      if (!e.target.className.includes('lang')) {
        setShowDropDown(false);
      }
    })
  }, [])

  return (
    <div className='lang'
         onClick={() => setShowDropDown(!showDropDown)}
         style={{background: showDropDown ? '#fff' : 'transparent'}}
    >
      <span className="lang__selected" style={{color: showDropDown ? 'orange' : 'gray'}}>
        {selectedLang}
      </span>
      {showDropDown ?
        <div className='lang__dropdown'>
          <ul className='lang__list'>
            {languages.map(lang =>
              lang.shortname !== selectedLang ?
                <li
                  key={lang.id}
                  className='lang__item'
                  onClick={() => {
                    localStorage.setItem('lang', lang.shortname)
                  }}>
                  <img src={lang.flag} alt={lang.name}/>
                  <span className="lang__name">{lang.name}</span>
                </li>
                :
                null)
            }
          </ul>
        </div>
        :
        null
      }
    </div>
  );
};

export default LanguageDropDown;