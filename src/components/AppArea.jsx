
// area for notes
import useLocalStorage from "../lib/useLocalStorage";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { useState } from "react";
import defaultColors from "../lib/defaultNoteColors";
import {AnimatePresence, motion} from "framer-motion";

import FloatingActionButton from "./FloatingActionButton";
import Note from "./Note";
import Area from "./Area";
import About from "./About";
import Label from "./Label";

import CreateForm from "./CreateForm";


const NArea = styled.section`
    height: 100%;
    display: grid;
`

const BottomBar = styled.section`
    width: 100%;
    align-items: center;
    position:fixed;
    bottom: 0;
    display: flex;
    gap: .5em;
    justify-content: space-between;
    padding: 1em;
`

const FormWrapper = styled(motion.div)`
    position: fixed;
    bottom: 12%;
    left: 0;
    height: auto;
    width: auto;
    min-width: 300px;
    max-height: 400px;
    padding: 1em;
    border-radius: 1em;
    color: ${() => useTheme().text};
 `


const ButtonGroup = styled.div`
    display: flex;
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

export default function AppArea ({windowRef, noteColors}) {

    const [notes, setNotes] = useLocalStorage('notes', {})
    const [areas, setAreas] = useLocalStorage('areas', {})
    const [labels, setLabels] = useLocalStorage('labels', {})

    const [showCreateNoteForm, setShowCreateNoteForm] = useState(false)
    const [showCreateAreaForm, setShowCreateAreaForm] = useState(false)
    const [showCreateLabelForm, setShowCreateLabelForm] = useState(false)

    // only one form can be shown at a time
    function toggleCreateNoteForm () {
        setShowCreateNoteForm(!showCreateNoteForm)
        if(showCreateAreaForm) setShowCreateAreaForm(false)
        if(showCreateLabelForm) setShowCreateLabelForm(false)
    }

    function toggleCreateAreaForm () {
        setShowCreateAreaForm(!showCreateAreaForm)
        if(showCreateNoteForm) setShowCreateNoteForm(false)
        if(showCreateLabelForm) setShowCreateLabelForm(false)
    }

    function toggleCreateLabelForm () {
        setShowCreateLabelForm(!showCreateLabelForm)
        if(showCreateNoteForm) setShowCreateNoteForm(false)
        if(showCreateAreaForm) setShowCreateAreaForm(false)

    }

    // ---------------- methods for managing notes ----------------

    function addNote (id, data) {

        // random position for the note within the window
        const defaultPosition = {
            x: Math.floor(Math.random() * (windowRef.right - 300)),
            y: Math.floor(Math.random() * (windowRef.bottom - 300))
        }

        const defaultSize = {
            width: 200,
            height: 200
        }

        const newNoteData = {
            id: data.id,
            title: data.title, 
            content: data.body, 
            position: defaultPosition, 
            size: defaultSize,
            color: data.color,
        }

        setNotes({...notes, [id]: newNoteData})
    }

    function removeNote (id) {
        const newNotes = {...notes}
        delete newNotes[id]
        setNotes(newNotes)
    }

    // add the the amout of pixels the note moved to the old position
    function updateNotePosition(id, info) {
        const oldPosition = notes[id].position
        let newX = oldPosition.x + info.offset.x
        let newY = oldPosition.y + info.offset.y

        // if the note is outside the window, move it back inside
        // left bound
        if (newX < 0) newX = 0
        // top bounds
        if (newY < 0) newY = 0
        // right bound
        if (newX > windowRef.right - 200) newX = windowRef.right - 250
        // bottom bound
        if (newY > windowRef.bottom - 200) newY = windowRef.bottom - 250

        // move the note the end of the stack so it renders on top of other notes
        setNotes({...notes, [id]: {...notes[id], position: {x: newX, y: newY}}})
    }

    function updateNoteContents (id, noteTitle, noteContents) {

        const oldNotes = {...notes}
        oldNotes[id].title = noteTitle
        oldNotes[id].content = noteContents

        setNotes({...oldNotes})
    }

    // ---------------- methods for managing areas ----------------

    function addArea (id, data) {

        // random position for the Area within the window
        const defaultPosition = {
            x: Math.floor(Math.random() * (windowRef.right - 300)),
            y: Math.floor(Math.random() * (windowRef.bottom - 300))
        }

        const newAreaData = {
            id: data.id,
            title: data.title,
            position: defaultPosition,
            size: {
                width: 200,
                height: 200
            }
        }


        setAreas({...areas, [id]: {...newAreaData}})
    }

    function removeArea (id) {
        const newAreas = {...areas}
        delete newAreas[id]
        setAreas(newAreas)
    }

    // same basic thing as with notes but for areas
    function updateAreaPosition(id, info) {
        const oldPosition = areas[id].position
        let newX = oldPosition.x + info.offset.x
        let newY = oldPosition.y + info.offset.y

        // if the note is outside the window, move it back inside
        // left bound
        if (newX < 0) newX = 0
        // top bounds
        if (newY < 0) newY = 0
        // right bound
        if (newX > windowRef.right - 200) newX = windowRef.right - 250
        // bottom bound
        if (newY > windowRef.bottom - 200) newY = windowRef.bottom - 250

        setAreas({...areas, [id]: {...areas[id], position: {x: newX, y: newY}}})
    }

    // same thing as before but altering height and width instead of x and y
    function updateAreaSize(id, info) {
        // info = {height 0, width: 0}
        console.log("resize", info)
        setAreas({...areas, [id]: {...areas[id], size: {width: info.width, height: info.height}}})
    }

    // ---------------- Methods for Managing Labels ----------------

    function addLabel (id, data) {
        // random position for the note within the window
        const defaultPosition = {
            x: Math.floor(Math.random() * (windowRef.right - 300)),
            y: Math.floor(Math.random() * (windowRef.bottom - 300))
        }

        const newLabelData = {
            id: data.id,
            title: data.title, 
            position: defaultPosition, 
            color: data.color,
        }

        setLabels({...labels, [id]: newLabelData})
    }

    function removeLabel (id) {
        const newLabels = {...labels}
        delete newLabels[id]
        setLabels(newLabels)
    }

    function updateLabelPosition (id, info) {
        const oldPosition = labels[id].position
        let newX = oldPosition.x + info.offset.x
        let newY = oldPosition.y + info.offset.y

        // if the note is outside the window, move it back inside
        // left bound
        if (newX < 0) newX = 0
        // top bounds
        if (newY < 0) newY = 0
        // right bound
        if (newX > windowRef.right - 200) newX = windowRef.right - 250
        // bottom bound
        if (newY > windowRef.bottom - 200) newY = windowRef.bottom - 250

        setLabels({...labels, [id]: {...labels[id], position: {x: newX, y: newY}}})
    }

    return (
        <>
            <NArea>
                {/* here be notes and shit */}
                {/* render labels */}
                {
                    Object.values(notes).map((note) => {
                        return <Note
                            note={note}
                            deleteNote={removeNote}
                            key={note.id}
                            updateNotePosition={updateNotePosition}
                            updateNoteContents={updateNoteContents}
                            />
                    })
                }
                {
                    Object.values(labels).map((label) => {
                        return <Label
                            key={label.id}
                            label={label}
                            color={label.color}
                            remove={removeLabel}
                            updatePosition={updateLabelPosition}
                        />
                    })
                }
                {
                    Object.values(areas) &&
                    Object.values(areas).map((area) => {
                        return <Area
                            key={area.id}
                            title={area.title}
                            color={area.color}
                            position={area.position}
                            size={area.size}
                            deleteArea={removeArea}
                            updateAreaSize={updateAreaSize}
                            updateAreaPosition={updateAreaPosition}
                            />
                    })
                }
                
            </NArea>
                {/* Refactored Form */}
                 <AnimatePresence>
                    {
                        showCreateNoteForm &&
                        <FormWrapper
                            initial={{y: 400}}
                            animate={{y: 0}}
                            transition={{duration: .5, type: 'spring', bounce: .5}}
                            exit={{y: 400}}
                        >
                            <CreateForm type={'note'} cancel={() => setShowCreateNoteForm(false)} handleSubmit={addNote} colors={noteColors}  />
                        </FormWrapper>
                    }
                </AnimatePresence>

                <AnimatePresence>
                    {
                        showCreateLabelForm &&
                        <FormWrapper
                            initial={{y: 400}}
                            animate={{y: 0}}
                            transition={{duration: .5, type: 'spring', bounce: .5}}
                            exit={{y: 400}}
                        >
                            <CreateForm type='label' cancel={toggleCreateLabelForm} handleSubmit={addLabel} colors={noteColors}  />
                        </FormWrapper>
                    }
                </AnimatePresence>
                <AnimatePresence>
                    {
                        showCreateAreaForm &&
                        <FormWrapper
                            initial={{y: 400}}
                            animate={{y: 0}}
                            transition={{duration: .5, type: 'spring', bounce: .5}}
                            exit={{y: 400}}
                        >
                            <CreateForm type='area' cancel={toggleCreateLabelForm} handleSubmit={addArea} colors={noteColors}  />
                        </FormWrapper>
                    }
                </AnimatePresence>

                {/* ----------------- */}
            
                {/* <FormWrapper
                    initial={{opacity: 0, y: 300}}
                    animate={{
                    opacity: showCreateAreaForm ? 1 : 0,
                    y: showCreateAreaForm ? 0 : 300
                    }}
                >
                    <CreateForm addArea={addArea} type="area" cancel={() => setShowCreateAreaForm(false)} colors={noteColors} />
                </FormWrapper> */}

            <BottomBar>
                <ButtonGroup>
                    <FloatingActionButton icon="📝" label="New Text Note" onClick={() => toggleCreateNoteForm()} />
                    <FloatingActionButton icon="📰" label="New Label" onClick={() => toggleCreateLabelForm()} />
                    <FloatingActionButton icon="🔲" label="New Area" onClick={() => toggleCreateAreaForm()} />
                </ButtonGroup>
                <ButtonGroup>
                    <About />
                </ButtonGroup>
            </BottomBar>
        </>
    )
}