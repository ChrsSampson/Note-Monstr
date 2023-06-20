// about tag for the site

import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import {useTheme} from '@emotion/react'
import {CgInfo} from 'react-icons/cg'

const AboutContainer = styled(motion.div)`
    display: flex;
    align-items: center;
    cursor: pointer;
    width: auto;
    padding-right: 3em;
    height: 4em;
`

const Link = styled.a`
    color: ${() => useTheme().text};
    &:hover{
        color: #e47621;
    }
`
const variants = {
    rest: {
        opacity: 0,
        y: 50
    },
    hover: {
        opacity: 1,
        y: -5
    }
}

const iconVariants = {
    rest: {
        x: 250,
        scale: 2
    },
    hover: {
        x: -15,
        scale: 2.3
    }
}

const TextContainer = styled(motion.div)`
    font-size: 1.2em;
`

export default function About () {
    return (
        <AboutContainer initial="rest" animate="rest" whileHover="hover" >
            <motion.div variants={iconVariants}>
                <CgInfo />
            </motion.div>
            <TextContainer variants={variants}>
                Made by Chris <Link href="https://stucknode.com">@StuckNode</Link>
            </TextContainer>
        </AboutContainer>
    )
}