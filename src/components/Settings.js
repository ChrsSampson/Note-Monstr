// settings dialog

import styled from '@emotion/styled'
import {useTheme} from '@emotion/react'

import {motion, AnimatePresence} from 'framer-motion'

import {useState} from 'react'
import useLocalStorage from '../lib/useLocalStorage'
import defaultNoteColors from '../lib/defaultNoteColors'

import IconButton from './IconButton'

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

const ColorSection = styled.section`
    display: flex;
    flex-direction: column;
    gap: .25em;
    align-items: center;
    padding:.25em;
`
const ColorBox = styled.div`
    height: 2.85em;
    width: 2em;
    border-radius: .25em 0 0 .25em;
`
const ColorInputGroup = styled.div`
    display: flex;
    align-items: center;
`
const ColorInput = styled.input`
    border:1px solid ${() => useTheme().background};
    border-radius: 0 .25em .25em 0;
    background: ${() => useTheme().background};
    color: ${() => useTheme().text};
    font-size: 1.25em;
    width: 100%;
    padding: .5em;
    placeholder: ${() => useTheme().text};
`
const SectionTitle = styled.h3`
    border-bottom: 1px solid ${() => useTheme().text}};
`

export default function Settings ({display, setDisplay}) {

    const [noteColors, setColors] = useLocalStorage('noteColors', defaultNoteColors)

    const colorBoxes = []

    for (const color in noteColors) {
        colorBoxes.push(
            <ColorInputGroup>
                <ColorBox style={{background: noteColors[color]}} />
                <ColorInput onChange={(e) => ChangeColor(e, color)} value={noteColors[color]} />
            </ColorInputGroup>
        )
    }

    // TODO: Does not update Colorpicker State when colors change
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
                        <h1>Settings ⚙️</h1>
                        <IconButton onClick={() => setDisplay(false)} icon="❌" />
                    </TitleBar>
                    <ColorSection>
                        <SectionTitle>Color Picker</SectionTitle>
                        {
                            colorBoxes
                        }
                    </ColorSection>
                </Panel>

                </Backdrop>
            }
        </AnimatePresence>
    )
}