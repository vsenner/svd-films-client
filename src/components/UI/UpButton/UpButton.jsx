import React, {useEffect} from 'react'
import './UpButton.scss'
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
            <button className={classButton} onClick={scrolling}>
                <div className={classButton.concat("__Arrow")}/>
                Up
            </button>
    )
}

export default UpButton;