
// area for notes
import useLocalStorage from "../lib/useLocalStorage";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import defaultColors from "../lib/defaultNoteColors";
import Note from "./Note";

import FloatingActionButton from "./FloatingActionButton";
import CreateNoteForm from "./CreateNoteForm";

const NArea = styled.section`
    height: 100%;
    display: grid;
`

const BottomBar = styled.section`
    width: 100%;
    position:fixed;
    bottom: 0;
    display: flex;
    gap: .5em;
    justify-content: flex-start;
    padding: 1em;
`

const FormWrapper = styled.div`
    position: fixed;
    bottom: 20%;
    left: 0;
    height: auto;
    width: auto;
    max-width: 300px;
    max-height: 250px;
    padding: 1em;
    border-radius: 1em;
    transition: 0.5s;
    color: ${() => useTheme().text};
`

// Note Structure
// {
//     id: {
//         title: 'title',
//         content: 'content',
//         area: 'area',
//         ect..
//     }
// }

// Area Structure
// {
//     id: {
//         name: 'name',
//         notes: ['note1', 'note2', 'note3']
//     }

export default function NoteArea () {

    const [notes, setNotes] = useLocalStorage('notes', {})
    const [areas, setAreas] = useLocalStorage('areas', {})
    const [noteColors, setNoteColors] = useLocalStorage('noteColors', defaultColors)

    const [showCreateNoteForm, setShowCreateNoteForm] = useState(false)
    const [showCreateAreaForm, setShowCreateAreaForm] = useState(false)

    function addNote (id, data) {
        setNotes({...notes, [id]: data})
    }

    function removeNote (id) {
        const newNotes = {...notes}
        delete newNotes[id]
        setNotes(newNotes)
    }


    return (
        <>
            <NArea>
                {/* here be notes and shit */}
                {
                    Object.values(notes).map((note) => {
                        return <Note note={note} deleteNote={removeNote} key={note.id} />
                    })
                }

            </NArea>
            { showCreateNoteForm &&
                    // this is hear because styled components kept re-rendering the entire form everytime a letter was typed
                    <FormWrapper>
                        <CreateNoteForm addNote={addNote} cancel={() => setShowCreateNoteForm(false)} colors={noteColors} />
                    </FormWrapper>
            }
            <BottomBar>
                <FloatingActionButton icon="📝" label="New Note" onClick={() => setShowCreateNoteForm(!showCreateNoteForm)} />
                <FloatingActionButton icon="📰" label="New Area" onClick={() => setShowCreateAreaForm(!showCreateAreaForm)} />
            </BottomBar>
        </>
    )
}