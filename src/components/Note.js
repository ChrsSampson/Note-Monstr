// a note display component

import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import {useState} from "react";
import IconButton from "./IconButton";


// Draggable cannot go here because it needs a rendered component to display
export default function Note ({note, deleteNote}) {

    const theme = useTheme()

    const [hovered, setHovered] = useState(false)

    const NoteContainer = styled.article`
        display: flex;
        flex-direction: column;
        border-radius: .5em;
        height: 10em;
        width: 10em;
        padding: .5em;
        color: ${theme.text};
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
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <NoteHeader>
                    {note.title}
                    {hovered &&
                        <IconButton icon="🗑️" size={".75em"} onClick={() => deleteNote(note.id)}/>
                    }
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