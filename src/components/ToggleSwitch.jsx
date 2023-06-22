// toggle switch

import styled from '@emotion/styled'
import {useTheme} from '@emotion/react'
import {motion, AnimatePresence} from 'framer-motion'

const SwitchWrapper = styled('div')`
    justify-content: space-between;
    height: 3em;
    width: 8em;
    background: ${() => useTheme().background};
    border-radius: 1.5em;
`
const Knob = styled(motion.div)`
    display: grid;
    place-items: center;
    height: 3em;
    width: 3em;
    background: ${() => useTheme().text};
    border-radius: 50%;
    cursor: pointer;
`
const SwitchContainer= styled.div`
    display: 'flex';
    alignItems: 'center;
    flexDirection: 'row';
    width: '100%';
    justifyContent: 'space-between';
`

const Icon = styled(motion.div)`
    display: grid;
    place-items: center;
    font-size: 2.15em;
`

export default function Switch({value, toggleValue, label}) {


    return (
        <SwitchContainer>
            <SwitchWrapper id={label} onClick={toggleValue}>
                <Knob
                    initial={{x: value ? '5em' : '0em'}}
                    dragConstraints={{left: 0, right: 100}}
                    animate={{x: value ? '5em' : '0em'}}
                    transition={{duration: .25}}
                >
                    {value ? <Icon>🌚</Icon> : <Icon>🌞</Icon>}
                </Knob>
            </SwitchWrapper>
        </SwitchContainer>
    )
}