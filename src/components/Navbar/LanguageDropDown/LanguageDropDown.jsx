import React, {useEffect, useMemo, useState} from 'react';
import './LanguageDropDown.scss'

const languages = [
  {id: 0, name: 'Русский', shortname: 'ru', flag: 'https://www.worldometers.info/img/flags/rs-flag.gif'},
  {id: 1, name: 'English', shortname: 'en', flag: 'https://www.worldometers.info/img/flags/us-flag.gif'},
  {id: 2, name: 'Українська', shortname: 'uk', flag: 'https://www.worldometers.info/img/flags/up-flag.gif'}
]

const LanguageDropDown = () => {
  const selectedLang = useMemo(() => {
      const clientLanguage = localStorage.getItem('lang');
      return languages.find(lang => lang.shortname === clientLanguage) ? clientLanguage : 'EN'
    // eslint-disable-next-line
    }, [localStorage.lang])
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
      <span className="lang__selected" style={{color: showDropDown ? 'orange' : 'white'}}>
        {selectedLang.toUpperCase()}
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
                    localStorage.setItem('lang', lang.shortname);
                    document.location.reload();
                  }}
                >
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