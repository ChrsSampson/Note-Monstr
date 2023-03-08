
// area for notes
import useLocalStorage from "../lib/useLocalStorage";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";

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

// Note Structure
// {
//     id: {
//         title: 'title',
//         content: 'content',
//         area: 'area',
//         ect..
//     }
// }

export default function NoteArea () {

    const [notes, setNotes] = useLocalStorage('notes', {})
    const [areas, setAreas] = useLocalStorage('areas', [])

    const [showCreateNoteForm, setShowCreateNoteForm] = useState(false)
    const [showCreateAreaForm, setShowCreateAreaForm] = useState(false)

    function addNote (id, data) {
        setNotes({...notes, [id]: data})
    }

    function removeNode (id) {
        const newNotes = {...notes}
        delete newNotes[id]
        setNotes(newNotes)
    }

        
    return (
        <>
            <NArea>

            </NArea>
            {showCreateNoteForm ? 
                <CreateNoteForm addNote={addNote} cancel={() => setShowCreateNoteForm(false)} />
                : null
            }
            <BottomBar>
                <FloatingActionButton icon="📝" label="New Note" onClick={() => setShowCreateNoteForm(!showCreateNoteForm)} />
                <FloatingActionButton icon="📰" label="New Area" onClick={() => setShowCreateAreaForm(!showCreateAreaForm)} />
            </BottomBar>
        </>
    )
}