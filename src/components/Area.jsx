
// Organizational component for the notes - draggable and resizable

import { useState } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { motion, useDragControls } from "framer-motion";
import {Resizable}  from 're-resizable';
import IconButton from "./IconButton";
import textAutoColor from "../lib/textAutoColor";


export default function NoteArea ({id, title, size, position, updateAreaSize, updateAreaPosition, deleteArea, color}) {

    const dragControls = useDragControls();
    const theme = useTheme();

    const AreaHeader = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    padding: 0.25em .5em;
    align-items: center;
    width: ${size.width}px;
    min-height: 100%
    color: ${textAutoColor(color || theme.background)};
    border: 2px solid ${theme.text};
    background: ${color};
    cursor: grab;
    border-radius: .5em .5em 0 0;
    `

    const AreaTitle = styled.h4`
        font-size: 1.6em;
        margin: 0;
        color: ${textAutoColor(color || theme.background)};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `

    const AreaWrapper = styled(motion.div)`
        position: absolute;
        display: flex;
        flex-direction: column;
        background: transparent;
        color: ${theme.text};
    `

    const Area = styled(Resizable)`
        background: ${theme.textarea};
        border: 1px solid ${theme.text};
        border-radius:  0 0 .5em .5em;
    `

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return(
        <AreaWrapper
            drag
            whileDrag={{scale: 1.1, opacity: .8, shadow: 10}}
            transition={{duration: .2}}
            dragControls={dragControls}
            dragMomentum={false}
            onDragEnd={(e, info) => updateAreaPosition(id, info)}
            initial={{x: position.x, y: position.y, height: size.height, width: size.width}}
        >
            <AreaHeader
                className="drag-handle"
                onPointerDown={(e) => {
                    if(e.target.classList.contains('drag-handle')) return;
                }}
            >
                <AreaTitle>
                    {capitalizeFirstLetter(title)}
                </AreaTitle>
                <IconButton icon="🗑️" onClick={() => deleteArea(id)} />
            </AreaHeader>
            {/* this broke many things  */}
            <Area
                size={{
                    width: size.width,
                    height: size.height
                }}
                onResize={() => console.log('resize')}
                onResizeStop={(e, direction, ref, d) => updateAreaSize(id, d)}
            >
            </Area>
        </AreaWrapper>
    )
    
}