import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";
import { useState } from "react";
import {v4} from 'uuid';
import IconButton from "./IconButton";

const NoteArea = styled.div``

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
    border-bottom: 2px solid ${() => useTheme().text};
    font-size: 1.25em;
    placeholder: ${() => useTheme().text};
`


export default function CreateAreaForm ({addArea, cancel}) {

    const [title, setTitle] = useState('')

    function handleSubmit(e){
        e.preventDefault()
        const id = v4()
        const data = {
            id: id,
            title: title || 'Untitled',
            size: {
                width: 200,
                height: 200
            },
            position: {
                x: 200,
                y: 200
            }
        }

        addArea(id, data)

        setTitle('')
    }

    return(
        <NoteArea>
            <ButtonGroup>
                <IconButton icon={"❌"} label="Cancel" onClick={cancel} />
                <IconButton icon={"✅"} submit label="Looks Good" onClick={(e) => {handleSubmit(e)}} />
            </ButtonGroup>
            <FormGroup>
                <FormInput type="text" placeholder="At your command..." value={title} onChange={(e)=> setTitle(e.target.value)} />
            </FormGroup>
        </NoteArea>
    )
}