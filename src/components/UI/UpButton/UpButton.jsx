import React, {useEffect} from 'react'
import './UpButton.css'
import {useState} from "react";

const UpButton = () => {
    const [scroll, setScroll] = useState(0)
    const [classButton, setClassButton] = useState('hiddenButton')
    const scrollingLogic = () => {
        setScroll(document.documentElement.scrollTop);
    }
    useEffect(() => {
        window.addEventListener('scroll', scrollingLogic)
        if (scroll < document.documentElement.clientHeight) setClassButton('hiddenButton')
        else setClassButton('visibleButton')

    }, [scroll])
    const scrolling = (e) => {
        window.scrollTo(0, 0)
        e.preventDefault()
    }
    return (
        <div className={classButton}>
            <button onClick={scrolling}>
                click here
            </button>
        </div>
    )
}

export default UpButton;