// a note display component

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {useState} from "react";
import IconButton from "./IconButton";
import textAutoColor from "../lib/textAutoColor";
import { motion } from "framer-motion";

// Draggable cannot go here because it needs a rendered component to display
export default function Note ({note, deleteNote, updateNotePosition}) {

    const theme = useTheme()

    const NoteContainer = styled(motion.article)`
        display: flex;
        flex-direction: column;
        border-radius: .5em;
        height: 10em;
        width: 10em;
        padding: .5em;
        color: ${textAutoColor(note.color)};
    `

    const NoteHeader = styled.div`
        display: flex;
        font-size: 1.4em;
        justify-content: space-between;
        align-items: center;
    `
    const NoteBody = styled.div`
        display: flex;
        flex-direction: column;
        text-align: left;
        height: 100%;
    `

    const NoteFooter = styled.div`
        display: flex;
        justify-content: flex-end;
    `

    return (
            <NoteContainer 
                style={{background: note.color}}
                animate={{scale: 1}}
                drag
                whileDrag={{scale: 1.1, opacity: .8}}
                transition={{duration: .2}}
                dragMomentum={false}
                onDragEnd={(e, info) => updateNotePosition(note.id, info)}
                // set the initial position of the note
                initial={{x: note.position.x, y: note.position.y}}
            >
                <NoteHeader>
                    {note.title}
                    <IconButton icon="🗑️" size={".75em"} onClick={() => deleteNote(note.id)}/>
                </NoteHeader>
                <NoteBody>
                    {note.content}
                </NoteBody>
                <NoteFooter>
                    <IconButton icon="↘" size={"1em"}/>
                </NoteFooter>
            </NoteContainer>
    )
}