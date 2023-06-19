// settings dialog

import styled from '@emotion/styled'
import {useTheme} from '@emotion/react'

import {motion, AnimatePresence} from 'framer-motion'
import SettginsColorSwitcher from './SettingsColorSwitcher'

import {useState} from 'react'

import IconButton from './IconButton'
import ToggleSwitch from './ToggleSwitch'

const Backdrop = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(5px);
    background: rgba(0,0,0,0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    place-items: center;
    z-index: 100;
`

const Panel = styled.article`
    width: 20em;
    background: ${() => useTheme().button.primary};
    color: ${() => useTheme().text};
    drop-shadow: 0 0 1em ${() => useTheme().shadow};
    padding: 1em;
    border-radius: 1em;
`
const TitleBar = styled.div`
    display: flex;
    justify-content: space-between;
`

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: .25em;
    align-items: center;
    padding:.25em;
`

const SectionTitle = styled.h3`
    border-bottom: 1px solid ${() => useTheme().text}};
`

export default function Settings ({display, setDisplay, noteColors, setColors, themeMode, changeTheme}) {



    const colorBoxes = []

    function handleColorChange (color, key) {
        setColors({...noteColors, [key]: color})
    }

    for (const color in noteColors) {

        colorBoxes.push(
            <SettginsColorSwitcher key={color} cKey={color} color={noteColors[color]} setColors={handleColorChange} />
        )
    }

    function convertThemeValueToBool (value) {
        if(value === 'light') return false
        if(value === 'dark') return true
    }

    function ChangeColor (e, key) {
        // stops user from deleting # and setting no color
        if(!e.target.value) return

       const newSet = {...noteColors}
        newSet[key] = e.target.value

        setColors(newSet)
    }

    // when the user clicks off the main panel, close the settings dialog
    function unFocus(e) {
        if(e.target.id === "backdrop") { 
            setDisplay(false) 
        }

    }

    return (
        <AnimatePresence>
            { display &&
                <Backdrop id="backdrop" onClick={(e) => unFocus(e)} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} >
                    
                <Panel>
                    <TitleBar>
                        <div>
                            <h1>Settings ⚙️</h1>
                            
                        </div>
                        <IconButton onClick={() => setDisplay(false)} icon="❌" />
                    </TitleBar>
                    <Section>
                        <SectionTitle>Apperance</SectionTitle>
                        <ToggleSwitch label={'Dark Mode'} value={convertThemeValueToBool(themeMode)} toggleValue={changeTheme} />
                    </Section>
                    <Section>
                        <div>
                            <SectionTitle>Color Picker</SectionTitle>
                            <sub>This will change the color of the notes and lables.</sub>
                        </div>
                        {
                            colorBoxes
                        }
                    </Section>
                </Panel>

                </Backdrop>
            }
        </AnimatePresence>
    )
}