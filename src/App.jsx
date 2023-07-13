import './App.css';

import useLocalStorage from './lib/useLocalStorage';
import useWindow from './lib/useWindow';

import { useState } from 'react';

import styled from '@emotion/styled';

import { ThemeProvider } from '@emotion/react';
import { theme } from './lib/theme';
import { useTheme } from '@emotion/react';

import Navbar from './components/Navbar';
import AppArea from './components/AppArea';
import Settings from './components/Settings';
import SignUpForm from './components/SignUpForm';
import LoginForm from './components/LoginForm';

import defaultColors from './lib/defaultNoteColors';

import { io } from 'socket.io-client';
import { SiFmod } from 'react-icons/si';

let userSession = 'fuckballs';

const scrt = import.meta.env.VITE_SECRET;

const socket = io('http://localhost:3000', {
    auth: {
        token: userSession,
        secret: scrt,
    },
});

socket.on('connect', (ws) => {
    console.log('up');
});

socket.on('disconnect', (ws) => {
    console.log('down');
});

socket.on('error', (err) => {
    console.error('Socket.IO Error', err);
});

socket.on('echo', (message) => {
    console.log('echo', message);
});

socket.on('connect_error', (err) => {
    console.error('Connection Error', err);
});

function handleSignup(data, cb) {
    socket.emit('sign-up', data, (res) => {
        cb(res);
    });
}

function handleLogin(data) {
    socket.emit('user-login', data);
}

const borderOffset = 16;

const AppContainer = styled.main`
    overflow: hidden;
    background: ${() => useTheme().background};
    color: ${() => useTheme().text};
    transition: 0.5s;
    transition-property: background, color;
`;

function App() {
    const [themeMode, setThemeMode] = useLocalStorage('theme', 'dark');

    const [showSettings, setShowSettings] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

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

    function toggleSignUp() {
        setShowSettings(false);
        setShowSignUp(!showSignUp);
    }

    function toggleLogin() {
        setShowSettings(false);
        setShowLogin(!showLogin);
    }

    const windowRef = {
        top: 0,
        left: 0,
        right: widthAfterOffset,
        bottom: heightAfterOffset,
    };

    return (
        <ThemeProvider theme={theme[themeMode]}>
            <AppContainer
                style={{ height: heightAfterOffset, width: widthAfterOffset }}
                className="App"
            >
                <Navbar
                    changeTheme={changeTheme}
                    themeMode={themeMode}
                    toggleSettings={toggleSettings}
                />
                <AppArea windowRef={windowRef} noteColors={colors} />
            </AppContainer>
            {/* overlays */}
            <Settings
                display={showSettings}
                setDisplay={setShowSettings}
                toggleSignUp={toggleSignUp}
                toggleLogin={toggleLogin}
                noteColors={colors}
                setColors={setColors}
                themeMode={themeMode}
                changeTheme={changeTheme}
            />
            <SignUpForm
                display={showSignUp}
                setDisplay={setShowSignUp}
                handleSubmit={handleSignup}
            />
            <LoginForm
                display={showLogin}
                setDisplay={setShowLogin}
                handleSubmit={handleLogin}
            />
        </ThemeProvider>
    );
}

export { socket };

export default App;
