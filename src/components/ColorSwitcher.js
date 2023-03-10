// color switching component for the create note form

import {motion, AnimatePresence} from 'framer-motion'
import styled from '@emotion/styled'
import {useTheme} from '@emotion/react'
import {useState} from 'react'

export default function ColorSwitcher ({currentColor, colors, setColor}) {

    const [show, setShow] = useState(false)

    const Wrapper = styled(motion.div)`
        display: flex;
        flex-direction: column;
    `

    const ButtonList = styled(motion.div)`
        display: flex;
        position: absolute;
        top:-1em;
        gap: .25em;
    `

    // create a gradient of all avialiabe colors to represent random color
    function createRainbow(){
        const colorList = Object.values(colors)
        const gradient = colorList.map(color => color).join(', ')
        return `linear-gradient(30deg, ${gradient})`
    }

    // display the current color tile 

    function changeColor (color) {
        setShow(false)
        setColor(color)
    }

    // on hover reveal the other options 
    return (
        <Wrapper>
            {/* waits for component to do animation before unmount */}
            <AnimatePresence>
                {show &&
                    <ButtonList 
                        key={'ColorPickerButtonList'}
                        initial={{opacity: 0, y: -0}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0, y: -20}}
                    >
                        {
                            Object.values(colors).map((color, index) => {
                                return (
                                    <ColorButton key={color + index} color={color} click={() => changeColor( color)} />
                                )
                            })
                        }
                    </ButtonList>
                }
            </AnimatePresence>
                <ColorButton click={() => setShow(!show) } color={currentColor || createRainbow()} />
        </Wrapper>
    )
}

// this button is only used here so it lives in here
function ColorButton ({color = 'grey', click}) {
    const theme = useTheme()

    const ColorTile = styled(motion.div)`
        width: 1.5em;
        height: 1.5em;
        border-radius: .25em;
        background: ${color};
        margin-top: 1em;
    `

    const ColorButton = styled.button`
        width: 100%;
        height: 100%;
        background: none;
        border: 2px solid ${theme.text};
        border-radius: .25em;
    `

    return (
        <ColorTile 
            submit="false"
            whileHover={{
                scale: 1.2,
            }}
            whileTap={{
                scale: .9,
            }}
        >
            <ColorButton onClick={() => click()} />
        </ColorTile>
    )
}