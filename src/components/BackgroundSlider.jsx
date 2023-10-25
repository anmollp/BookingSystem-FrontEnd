import { useState, useEffect } from 'react';
import imageSlide from '../data/data'
import '../styles/slider.css';


const BackgroundSlider = ({children, ...props}) => {
    const [currentState, setCurrentState] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentState((currentState + 1) % imageSlide.length);
        }, 5000)
        return () => clearTimeout(timer);
    }, [currentState])

    const bgImageStyle = {
        backgroundImage: `url(${imageSlide[currentState].url})`,
        position: 'fixed',
        backgroundSize: 'cover',
        zIndex: '-1',
        height: '100vh',
        width: '100vw',
        transition: 'background-image 1s ease-in-out 1s',
    }
    return (
        <div style={bgImageStyle}></div>
    )
}

export default BackgroundSlider;