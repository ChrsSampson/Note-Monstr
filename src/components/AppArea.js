
// area for notes
import useLocalStorage from "../lib/useLocalStorage";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import defaultColors from "../lib/defaultNoteColors";
import {motion} from "framer-motion";

import FloatingActionButton from "./FloatingActionButton";
import CreateNoteForm from "./CreateNoteForm";
import CreateAreaForm from "./CreateAreaForm";
import Note from "./Note";
import Area from "./Area";

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

const FormWrapper = styled(motion.div)`
    position: fixed;
    bottom: 20%;
    left: 0;
    height: auto;
    width: auto;
    max-width: 300px;
    max-height: 400px;
    padding: 1em;
    border-radius: 1em;
    color: ${() => useTheme().text};
 `

// Note Structure
// {
//     id: {
//         title: 'title',
//         content: 'content',
//         color: '#fff',
//         position: {
//             x: 0,
//             y: 0
//         }
//     }
// }

// Area Structure
// {
//     id: {
//         name: 'name',
//         position: {
//             x: 0,    
//             y: 0 
//         },
//         z: 1,      // z-index
//         size: {
//             width: 200,
//             height: 200
//         },
//         size: {
//             width: 0,
//             height: 0
//         }
//     }

export default function AppArea () {

    const [notes, setNotes] = useLocalStorage('notes', {})
    const [areas, setAreas] = useLocalStorage('areas', {})
    const [noteColors, setNoteColors] = useLocalStorage('noteColors', defaultColors)

    const [showCreateNoteForm, setShowCreateNoteForm] = useState(false)
    const [showCreateAreaForm, setShowCreateAreaForm] = useState(false)

    // only one form can be shown at a time
    function toggleCreateNoteForm () {
        setShowCreateNoteForm(!showCreateNoteForm)
        setShowCreateAreaForm(false)
    }

    function toggleCreateAreaForm () {
        setShowCreateAreaForm(!showCreateAreaForm)
        setShowCreateNoteForm(false)
    }

    // ---------------- methods for managing notes ----------------

    function addNote (id, data) {
        setNotes({...notes, [id]: data})
    }

    function removeNote (id) {
        const newNotes = {...notes}
        delete newNotes[id]
        setNotes(newNotes)
    }

    // add the the amout of pixels the note moved to the old position
    function updateNotePosition(id, info) {
        const oldPosition = notes[id].position
        const newX = oldPosition.x + info.offset.x
        const newY = oldPosition.y + info.offset.y
        // move the note the end of the stack so it renders on top of other notes
        setNotes({...notes, [id]: {...notes[id], position: {x: newX, y: newY}}})
    }

    // ---------------- methods for managing areas ----------------

    function addArea (id, data) {
        setAreas({...areas, [id]: data})
    }

    function removeArea (id) {
        const newAreas = {...areas}
        delete newAreas[id]
        setAreas(newAreas)
    }

    // same basic thing as with notes but for areas
    function updateAreaPosition(id, info) {
        const oldPosition = areas[id].position
        const newX = oldPosition.x + info.offset.x
        const newY = oldPosition.y + info.offset.y
        setAreas({...areas, [id]: {...areas[id], position: {x: newX, y: newY}}})
    }

    // same thing as before but altering height and width instead of x and y
    function updateAreaSize(id, info) {
        // info = {height 0, width: 0}
        console.log("resize", info)
        setAreas({...areas, [id]: {...areas[id], size: {width: info.width, height: info.height}}})
    }

    return (
        <>
            <NArea>
                {/* here be notes and shit */}
                {
                    Object.values(notes).map((note) => {
                        return <Note
                            note={note}
                            deleteNote={removeNote}
                            key={note.id}
                            updateNotePosition={updateNotePosition}
                            />
                    })
                }
                {
                    Object.values(areas).map((area) => {
                        return <Area
                            area={area}
                            key={area.id}
                            deleteArea={removeArea}
                            updateAreaSize={updateAreaSize}
                            updateAreaPosition={updateAreaPosition}
                            />
                    })
                }
            </NArea>
                {/* Create Note Form */}
                <FormWrapper animate={{
                    opacity: showCreateNoteForm ? 1 : 0,
                    y: showCreateNoteForm ? 0 : 300
                }}>
                    <CreateNoteForm addNote={addNote} cancel={() => setShowCreateNoteForm(false)} colors={noteColors} />
                </FormWrapper>
                {/* Create Area Form */}
                <FormWrapper animate={{
                    opacity: showCreateAreaForm ? 1 : 0,
                    y: showCreateAreaForm ? 0 : 300
                }}>
                    <CreateAreaForm addArea={addArea} cancel={() => setShowCreateAreaForm(false)} />
                </FormWrapper>
            <BottomBar>
                <FloatingActionButton icon="📝" label="New Note" onClick={() => toggleCreateNoteForm()} />
                <FloatingActionButton icon="📰" label="New Label" onClick={() => toggleCreateAreaForm()} />
            </BottomBar>
        </>
    )
}