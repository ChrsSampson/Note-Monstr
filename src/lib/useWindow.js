
// window resize hook

import { useState, useEffect } from 'react';


/**
 *
 * @returns {object} - returns an object with height and width of the browser window that updates on resize
 */
export default function useWindow() {
    const [windowSize, setWindowSize] = useState({width: window.innerWidth, height: window.innerHeight});

    function handleResize (e) {
        setWindowSize({width: window.innerWidth, height: window.innerHeight});
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    return windowSize;
}