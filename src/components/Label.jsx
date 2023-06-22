// Label Component (refactor of the old Area)

import { useState } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { motion,AnimatePresence } from "framer-motion";
import IconButton from "./IconButton";
import textAutoColor from "../lib/textAutoColor";



export default function Label ({label, color, updatePosition, remove, id}) {
    
    const theme = useTheme()

    const [isHovered, setIsHovered] = useState(false)

    // TODO Allow Editing

    // const [isEditing, setIsEditing] = useState(false)

    // const [newTitle, setNewTitle] = useState(label.title)

    const Container = styled(motion.div)`
        position: absolute;
        color: ${textAutoColor(color)};
        background: ${theme.color};
        cursor: grab;
        height: 50px;
        width: 225px;
        border-radius: .5em .5em 0 0;
        border-bottom: 2px solid ${textAutoColor(color)};
        box-shadow: 1px 1px 7px 3px ${theme.shadow};
        display: flex;
        flex-direction: column;
        justify-content: center;
    `

    const Title = styled.h4`
        font-size: 1.2em;
        padding: 0 1em;
    `

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <Container 
            drag
            style={{background: color}}
            whileDrag={{scale: 1.1}}
            onDragEnd={(e, dragEvent) => {
                updatePosition(label.id, dragEvent)
            }}
            initial={{x: label.position.x, y: label.position.y}}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Title>{capitalizeFirstLetter(label.title) || "Untitled"}</Title>
            <AnimatePresence >
                {isHovered &&
                    <motion.div
                        style={{
                            position: 'absolute',
                            left: '80%',
                            top: '.75em',
                            display: 'flex',
                        }}
                        initial={{x:-50}}
                        animate={{x:0}}
                        exit={{x:-50}}
                    >
                        <IconButton onClick={(e) => remove(label.id)} icon='🗑️' />
                    </motion.div>
                }
            </AnimatePresence>
        </Container>
    )
}

