
// create new note form

import IconButton from "./IconButton";
import { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import ColorSwitcher from "./ColorSwitcher";
import {v4} from 'uuid';

const FormGroup = styled.div`
    display: flex;
    margin: .5em 0;
`
const ButtonGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const FormInput = styled.input`
    background: none;
    border: none;
    color: ${() => useTheme().text};
    border-bottom: 1px solid ${() => useTheme().text};
    font-size: 1.25em;
    width: 100%;
    padding: .5em;
    placeholder: ${() => useTheme().text};
`
const TextArea = styled.textarea`
    height: 9em;
    width: 100%;
    padding: .5em;
    font-size: 1.1em;
    font-family: 'Poppins', sans-serif, monospace;
    color: ${() => useTheme().textAreaText};
    background: ${() => useTheme().textarea};
    border-radius: 1em;
    resize: none;
    border: none;
`

export default function CreateNoteForm ({addNote, cancel, colors}) {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [colorSelected, setColorSelected] = useState('')

    function handleSubmit(e){
        e.preventDefault()
        const id = v4()
        const data = {
            id: id,
            title: title,
            content: content,
            area: null,
            color: colorSelected ? colorSelected : pickRandomColor(),
            z: 1,
            position: {
                x: 200,
                y: 200
            }
        }

        addNote(id, data)
        // clear form
        setTitle('')
        setContent('')
    }

    function pickRandomColor(){
        const c = Object.values(colors)
        const random = Math.floor(Math.random() * c.length)
        return colors[random]
    }

    return(
        <form onSubmit={(e) => handleSubmit(e)}>
            <ButtonGroup>
                <FormGroup>
                    <ColorSwitcher
                        colors={colors}
                        currentColor={colorSelected}
                        setColor={setColorSelected} 
                    />
                </FormGroup>
                <FormGroup>
                    <IconButton icon={"❌"} label="Cancel" onClick={cancel} />
                    <IconButton icon={"✅"} submit label="Looks Good" onClick={(e) => {handleSubmit(e)}} />
                </FormGroup>
            </ButtonGroup>
            <FormGroup>
                <FormInput type="text" placeholder="An Awsome Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <TextArea placeholder="Your literary masterpiece..." value={content} onChange={(e) => setContent(e.target.value)} />
            </FormGroup>
        </form> 
    )
}