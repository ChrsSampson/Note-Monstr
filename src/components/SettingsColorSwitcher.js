

import styled from '@emotion/styled'
import { useTheme } from '@emotion/react'
import {useState} from 'react'
import { TwitterPicker } from 'react-color'

import {motion, AnimatePresence} from 'framer-motion'

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

export default function SettginsColorSwitcher ({color, setColors, cKey}) {

    const [showPicker, setShowPicker] = useState(false)

    const togglePicker = () => {
        setShowPicker(!showPicker)
    }

    const handleChange = (color, e) => {
        setColors(color.hex, cKey)
        togglePicker()
    }

    return (
        <motion.div
            inital={{}}
            animate={{height: showPicker ? 'auto' : '3em'}}
            transition={{duration: .25}}
        >
            <ColorInputGroup key={color}>
                <ColorBox style={{background: color}} />
                <ColorInput defaultValue={color} onClick={togglePicker}/>
            </ColorInputGroup>
            <AnimatePresence>
                { showPicker &&
                    // <AnimatePresence>
                    <motion.div
                        inital={{opacity: 0}}
                        animate={{x: 100, opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <TwitterPicker color={color} onChange={(color, e) => handleChange(color, e)} />
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    )

}