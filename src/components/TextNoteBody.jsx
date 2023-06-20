// text note body

import { useState } from 'react'
import styled from '@emotion/styled'
import textAutoColor from '../lib/textAutoColor'
import IconButton from './IconButton'


export default function TextNoteBody ({expanded,setExpanded, id, title, body, color, deleteNote, handleNoteUpdate}) {

    const [noteBody, setNoteBody] = useState(body)
    const [noteTitle, setNoteTitle] = useState(title)


    const NoteTitle = styled.h4`
        font-size: ${expanded ? ".3em" : ".9em"};
        margin: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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

    const NoteFooter = styled.div`
        display: flex;
        justify-content: flex-end;
        color: ${textAutoColor(color)};
        // transparent top gradient
        background: linear-gradient(rgba(255,255,255,0), rgba(rgb,1));
    `

    // making these inputs styled component causes problems with the render process and input focus
    const noteHeaderStyle = {
        display: 'flex',
        fontSize: '1.4em',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: `1px solid ${!expanded ? textAutoColor(color) : "transparent"}`,
    }
    
    const bodyInputStyle = {
        resize: "none",
        background: color,
        filter: "brightness(.8)",
        border: "none",
        borderRadius: ".25em",
        height: "100%",
        padding: '.25em'
    }

    const titleInputStyle = {
        resize: "none",
        border: 'none',
        borderRadius: '.25em',
        background: color,
        filter: 'brightness(.8)',
        width: '95%',
        padding: '.25em',
        marginBottom: '.25em'
    }

    const DetermineNoteBody = () => {
        if(expanded) {
            return (
                <textarea
                    style={bodyInputStyle}
                    value={noteBody}
                    onChange={(e) => setNoteBody(e.target.value)}
                />
            )
        }else {
            return (
                <NoteBody>
                    {body}
                </NoteBody>
            )
        }
    }

    const DetermineNoteTitle = () => {
        if (expanded) {
            return <input
                type="text"
                value={noteTitle} 
                onChange={(e) => setNoteTitle(e.target.value)}
                style={titleInputStyle} 
            />
        } else {
            return <NoteTitle>{title}</NoteTitle>
        }
    }

    return (
        <>
            <div style={noteHeaderStyle}>
                {DetermineNoteTitle()}
                <IconButton icon="🗑️" size={".6em"} onClick={() => deleteNote(id)}/>
            </div>
            {DetermineNoteBody()}
            <NoteFooter>
                {expanded && <IconButton icon="💾" size={".75em"} onClick={() => handleNoteUpdate(id, noteTitle, noteBody)}/> }
                <IconButton icon={expanded ? "↖" : "↘" } color={textAutoColor(color)} size={"1em"} onClick={() => setExpanded(!expanded)}/>
            </NoteFooter>
        </>
    )

}