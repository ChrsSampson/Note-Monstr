
// Organizational component for the notes - draggable and resizable

import { useState } from "react";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { motion, useDragControls } from "framer-motion";
import {Resizable}  from 're-resizable';
import IconButton from "./IconButton";



export default function NoteArea ({area, updateAreaSize, updateAreaPosition, deleteArea}) {

    const dragControls = useDragControls();
    const theme = useTheme();

    const AreaHeader = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    padding: 0.25em .5em;
    align-items: center;
    min-width: 100%;
    min-height: 100%
    color: ${theme.background};
    background: ${theme.text};
    cursor: grab;
    border-radius: .5em
`
    const AreaTitle = styled.h4`
        font-size: 1.1em;
        margin: 0;
        color: ${theme.background};
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
        border: 1px solid ${theme.text};
        border-radius:  0 0 .5em .5em;
    `

    return(
        <AreaWrapper
            drag
            whileDrag={{scale: 1.1, opacity: .8, shadow: 10}}
            transition={{duration: .2}}
            dragControls={dragControls}
            dragMomentum={false}
            onDragEnd={(e, info) => updateAreaPosition(area.id, info)}
            initial={{x: area.position.x, y: area.position.y, height: area.size.height, width: area.size.width}}
        >
            <AreaHeader
                className="drag-handle"
                onPointerDown={(e) => {
                    if(e.target.classList.contains('drag-handle')) return;
                }}
            >
                <AreaTitle>
                    {area.title}
                </AreaTitle>
                <IconButton icon="🗑️" onClick={() => deleteArea(area.id)} />
            </AreaHeader>
            {/* <Area
                defaultSize={{
                    width: area.size.width,
                    height: area.size.height
                }}
                onResizeStop={(e, direction, ref, d) => updateAreaSize(area.id, d)}
            >
            </Area> */}
        </AreaWrapper>
    )
    
}