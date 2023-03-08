// use Local Storage Hook
import { useState, useEffect } from 'react';

/**
   useLocalStorage Hook
   @param {string} key - key to store in local storage
   @param {any} defaultValue - default value to use if no value is stored in local storage
    @returns {[any, function]} - returns an array with the value stored in local storage and a function to update the value
*/
export default function useLocalStorage(key, defaultValue) {
    const [value, setValue] = useState(() => {
        return JSON.parse(localStorage.getItem(key)) || defaultValue;
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue];
}