// access the app settings and preferences though context provider

import {createContext, useContext} from 'react';

import useLocalStorage from '../lib/useLocalStorage';

import defaultNoteColors from '../lib/defaultNoteColors';

export const ConfigContext = createContext();

export function ConfigProvider({children}) {
    const [settings, setSettings] = useLocalStorage('settings', {
        noteColors: defaultNoteColors,
    });

    return (
        <ConfigContext.Provider value={[settings, setSettings]}>
            {children}
        </ConfigContext.Provider>
    )
}

