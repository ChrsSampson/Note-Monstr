import './App.css';

import useLocalStorage from './lib/useLocalStorage';
import useWindow from './lib/useWindow';

import { useState } from 'react';
import styled from '@emotion/styled';

import {ThemeProvider} from '@emotion/react';
import {theme} from './lib/theme';
import {useTheme} from '@emotion/react';

import Navbar from './components/Navbar';
import NoteArea from './components/NoteArea';

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
  // auto adjust to window size 
  const size = useWindow();

  const heightAfterOffset = size.height - borderOffset;
  const widthAfterOffset = size.width - borderOffset;

  function changeTheme() {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeProvider theme={theme[themeMode]}>
      <AppContainer style={{height: heightAfterOffset, width: widthAfterOffset}} className="App">
        <Navbar changeTheme={changeTheme} themeMode={themeMode} />
        <NoteArea />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
