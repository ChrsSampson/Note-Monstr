
// create new note form

import useLocalStorage from "../lib/useLocalStorage";
import IconButton from "./IconButton";
import { useState } from "react";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

import {v4} from 'uuid';


const FormGroup = styled.div`
    display: flex;
    margin: .5em 0;
`
const ButtonGroup = styled.div`
    display: flex;
    justify-content: flex-end;    
`

const FormInput = styled.input`
    background: none;
    border: none;
    color: ${() => useTheme().text};
    border-bottom: 1px solid ${() => useTheme().text};
    font-size: 1.25em;
    placeholder: ${() => useTheme().text};
`
const TextArea = styled.textarea`
    height: 5em;
    width: 100%;
    padding: .5em;
    font-size: 1.1em;
    font-family: 'Poppins', sans-serif, monospace;
    color: ${() => useTheme().text};
    background: ${() => useTheme().textarea};
    color: ${() => useTheme().background};
    border-radius: 1em;
    resize: none;
`


export default function ({addNote, show, cancel, colors}) {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [colorSelector, setColorSelector] = useState(pickRandomColor())

    function handleSubmit(e){
        e.preventDefault()
        const id = v4()
        const data = {
            id: id,
            title: title,
            content: content,
            area: null,
            color: colorSelector,
            position: {
                x: 0,
                y: 0
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
        <form>
            <ButtonGroup>
                <IconButton icon={"❌"} label="Cancel" onClick={cancel} />
                <IconButton icon={"✅"} submit label="Looks Good" onClick={(e) => {handleSubmit(e)}} />
            </ButtonGroup>
            <FormGroup>
                <FormInput type="text" placeholder="An Awsome Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <TextArea placeholder="Your Sicc Note" value={content} onChange={(e) => setContent(e.target.value)} />
            </FormGroup>
        </form>
    )
}