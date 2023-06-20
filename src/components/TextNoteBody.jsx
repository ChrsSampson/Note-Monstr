// text note body

import { useState } from 'react'
import styled from '@emotion/styled'
import textAutoColor from '../lib/textAutoColor'
import IconButton from './IconButton'


export default function TextNoteBody ({expanded, id, title, body, color, deleteNote}) {

    const [noteBody, setNoteBody] = useState(body)
    const [noteTitle, setNoteTitle] = useState(title)

    const BodyInput = styled.textarea`
    resize: none;
    border: 1px solid ${textAutoColor(color)};
    border-radius: .5em;
    background: transparent;
    height: 100%;
    `
    const TitleInput = styled.input`
    resize: none;
    border: 1px solid ${textAutoColor(color)};
    border-radius: .5em;
    background: transparent;
    width:95%;
    `
    const NoteHeader = styled.div`
    display: flex;
    font-size: 1.4em;
    justify-content: space-between;
    align-items: center;
    `

    const NoteTitle = styled.h4`
    font-size: ${expanded ? ".3em" : ".9em"};
    margin: 0;
    border-bottom: 1px solid ${textAutoColor(color)};
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

    const DetermineNoteBody = () => {
        if(expanded) {
            return (
                <BodyInput
                    type="text"
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
            return <TitleInput value={noteTitle} onChange={(e) => setNoteTitle(e.target.value)} />
        }
        return <NoteTitle>{title}</NoteTitle>
    }

    return (
        <>
            <NoteHeader>
                        {DetermineNoteTitle()}
                        <IconButton icon="🗑️" size={".75em"} onClick={() => deleteNote(note.id)}/>
            </NoteHeader>
            {DetermineNoteBody()}
        </>
    )

}