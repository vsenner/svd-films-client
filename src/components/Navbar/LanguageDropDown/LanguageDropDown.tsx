import React, {useEffect, useMemo, useState} from 'react';
import './LanguageDropDown.scss'

interface ILanguage {
  id: number,
  name: string,
  shortname: string,
  flag: string
}

const languages: ILanguage[] = [
  {id: 0, name: 'English', shortname: 'en', flag: 'https://www.worldometers.info/img/flags/us-flag.gif'},
  {id: 1, name: 'Українська', shortname: 'uk', flag: 'https://www.worldometers.info/img/flags/up-flag.gif'},
  {id: 2, name: 'Русский', shortname: 'ru', flag: 'https://www.worldometers.info/img/flags/rs-flag.gif'}
];

const LanguageDropDown = () => {
  const [showDropDown, setShowDropDown] = useState(false)

  const selectedLang: string | null = useMemo(() => {
    const clientLanguage = localStorage.getItem('lang');
    return languages.find(lang => lang.shortname === clientLanguage) ? clientLanguage : languages[0].shortname;
  }, [localStorage.lang])

  useEffect(() => {
    const closeDropDown = (e: MouseEvent) => {
      if (!(e?.target as HTMLElement)?.className?.includes('lang')) {
        setShowDropDown(false);
      }
    }

    document.addEventListener('click', closeDropDown);
    return () => {
      document.removeEventListener('click', closeDropDown);
    }
  }, [])

  return (
    <div
      className={`lang ${showDropDown ? 'active' : ''}`}
      onMouseLeave={() => showDropDown ? setShowDropDown(false) : null}
    >
      <button
        className="lang__selected"
        onClick={() => setShowDropDown(!showDropDown)}
      >
        {selectedLang?.toUpperCase()}
        <i className="fas fa-caret-down lang__arr"/>
      </button>
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
    </div>
  );
};

export default LanguageDropDown;