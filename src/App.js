import './App.css';

import useLocalStorage from './lib/useLocalStorage';
import styled from '@emotion/styled';


import {ThemeProvider} from '@emotion/react';
import {theme} from './lib/theme';
import {useTheme} from '@emotion/react';

import Navbar from './components/Navbar';
import NoteArea from './components/NoteArea';

const AppContainer = styled.main`
  height: 100vh;
  width:  100vw;
  overflow: hidden;
  background: ${() => useTheme().background};
  color: ${() => useTheme().text};
  transition: 0.5s;

`

function App() {

  const [themeMode, setThemeMode] = useLocalStorage('theme', 'dark');

  function changeTheme() {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
  }

  return (
    <ThemeProvider theme={theme[themeMode]}>
      <AppContainer className="App">
        <Navbar changeTheme={changeTheme} themeMode={themeMode} />
        <NoteArea />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
