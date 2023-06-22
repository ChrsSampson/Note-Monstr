import './App.css';

import useLocalStorage from './lib/useLocalStorage';
import useWindow from './lib/useWindow';

import {useState} from 'react';

import styled from '@emotion/styled';

import {ThemeProvider} from '@emotion/react';
import {theme} from './lib/theme';
import {useTheme} from '@emotion/react';

import Navbar from './components/Navbar';
import AppArea from './components/AppArea';
import Settings from './components/Settings';

import defaultColors from './lib/defaultNoteColors';

const borderOffset = 16;

const AppContainer = styled.main`
    overflow: hidden;
    background: ${() => useTheme().background};
    color: ${() => useTheme().text};
    transition: 0.5s;
    transition-property: background, color;
  `

function App() {
  
  const [themeMode, setThemeMode] = useLocalStorage('theme', 'dark');

  const [showSettings, setShowSettings] = useState(false);

  const [colors, setColors] = useLocalStorage('noteColors', defaultColors);

  // auto adjust to window size 
  const size = useWindow();

  const heightAfterOffset = size.height - borderOffset;
  const widthAfterOffset = size.width - borderOffset;

  function changeTheme() {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  }

  function toggleSettings() {
    setShowSettings(!showSettings);
  }

  const windowRef = {
    top: 0,
    left: 0,
    right: widthAfterOffset,
    bottom: heightAfterOffset
  }


  return (
    <ThemeProvider theme={theme[themeMode]}>
      <AppContainer style={{height: heightAfterOffset, width: widthAfterOffset}} className="App">
          <Navbar changeTheme={changeTheme} themeMode={themeMode} toggleSettings={toggleSettings} />
        <AppArea  windowRef={windowRef} noteColors={colors} />
      </AppContainer>
      <Settings display={showSettings} setDisplay={setShowSettings} noteColors={colors} setColors={setColors} themeMode={themeMode} changeTheme={changeTheme} />
    </ThemeProvider>
  );
}

export default App;
