// a note display component

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {useState} from "react";
import IconButton from "./IconButton";
import textAutoColor from "../lib/textAutoColor";
import { motion } from "framer-motion";

// Draggable cannot go here because it needs a rendered component to display
export default function Note ({note, deleteNote, updateNotePosition, bringNoteToFront}) {

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
    const NoteBody = styled.div`
        display: flex;
        flex-direction: column;
        text-align: left;
        height: 100%;
    `

    const NoteTitle = styled.h4`
        font-size: 1.1em;
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
    `

    return (
            <NoteContainer 
                style={{background: note.color}}
                animate={{scale: expanded ? 2 : 1, opacity: 1}}
                drag
                whileDrag={{scale: 1.1, opacity: .8, shadow: 10}}
                transition={{duration: .2}}
                // stops shuffle board - I might make this toggleable because funny
                dragMomentum={false}
                // update the position of the note on end
                onDragEnd={(e, info) => updateNotePosition(note.id, info)}
                // set the initial position of the note
                initial={{x: note.position.x, y: note.position.y}}
                // bring the note to the front on click
            >
                <NoteHeader>
                    <NoteTitle>{note.title}</NoteTitle>
                    <IconButton icon="🗑️" size={".75em"} onClick={() => deleteNote(note.id)}/>
                </NoteHeader>
                <NoteBody>
                    {note.content}
                </NoteBody>
                <NoteFooter>
                    <IconButton icon={expanded ? "↖" : "↘" } color={textAutoColor(note.color)} size={"1em"} onClick={() => setExpanded(!expanded)}/>
                </NoteFooter>
            </NoteContainer>
    )
}