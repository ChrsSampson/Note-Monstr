// a note display component

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {useState} from "react";
import IconButton from "./IconButton";
import textAutoColor from "../lib/textAutoColor";
import { motion, AnimatePresence } from "framer-motion";
import TextNoteBody from "./TextNoteBody";

// Draggable cannot go here because it needs a rendered component to display
export default function Note ({note, deleteNote, updateNotePosition, bringNoteToFront, updateNoteContents}) {

    const theme = useTheme()

    const [expanded, setExpanded] = useState(false)


    const NoteContainer = styled(motion.article)`
        position: absolute;
        display: flex;
        flex-direction: column;
        border-radius: .5em;
        height: 10em;
        width: 10em;
        padding: .5em;
        color: ${textAutoColor(note.color)};
        box-shadow: 1px 1px 7px 3px ${theme.shadow};
        z-index: ${note.z};
    `

    const NoteHeader = styled.div`
        display: flex;
        font-size: 1.4em;
        justify-content: space-between;
        align-items: center;
    `
    const NoteBody = styled.p`
        display: flex;
        flex-direction: column;
        text-align: left;
        height: 100%;
        width: 100%;
        font-size: ${expanded ? ".4em" : ".85em"};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: wrap;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        -moz-line-clamp: 2;
        -moz-box-orient: vertical;
    `

    const NoteTitle = styled.h4`
        font-size: ${expanded ? ".3em" : ".9em"};
        margin: 0;
        border-bottom: 1px solid ${textAutoColor(note.color)};
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    `

    const NoteFooter = styled.div`
        display: flex;
        justify-content: flex-end;
        color: ${textAutoColor(note.color)};
        // transparent top gradient
        background: linear-gradient(rgba(255,255,255,0), rgba(rgb,1));
    `



    function handleNoteUpdate(id, title, content) {
        updateNoteContents(id, title, content)
    }

    
    return (
        <AnimatePresence>
                <NoteContainer
                    style={{background: note.color}}
                    drag
                    whileDrag={{scale: 1.1, opacity: .8, shadow: 10}}
                    whileFocus={{scale: 2, shadow: 10}}
                    // stops shuffle board - I might make this toggleable because funny
                    dragMomentum={false}
                    // update the position of the note on end
                    onDragEnd={(e, info) => updateNotePosition(note.id, info)}
                    // set the initial position of the note
                    initial={{x: note.position.x, y: note.position.y}}
                    transition={{duration: .4, type: "spring", stiffness: 500, damping: 30}}
                    animate={{scale: expanded ? 2 : 1, opacity: 1}}
                    exit={{opacity: 0}}
                >
                    <TextNoteBody color={note.color} expanded={expanded} title={note.title} body={note.content} id={note.id} deleteNote={deleteNote} />
                    <NoteFooter>
                        {expanded && <IconButton icon="💾" size={".75em"} onClick={() => handleNoteUpdate(note.id, noteTitle, noteBody)}/> }
                        <IconButton icon={expanded ? "↖" : "↘" } color={textAutoColor(note.color)} size={"1em"} onClick={() => setExpanded(!expanded)}/>
                    </NoteFooter>
                </NoteContainer>
            </AnimatePresence>
    )
}