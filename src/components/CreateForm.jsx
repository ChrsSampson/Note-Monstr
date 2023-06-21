// Create Form - Refactor of the AreaForm and NoteForm

// This Component cannot use Styled Compoents due to rendering and focus issues

import {useState, useEffect} from 'react'
import {useTheme} from '@emotion/react'
import ColorSwitcher from './NoteColorSwitcher'
import {v4} from 'uuid'
import {motion} from 'framer-motion'
import IconButton from './IconButton'
import randomPlaceholder from '../lib/placeholderGenerator'

const placeholderFunction = () => console.warn('You Forgot your submit handler!')

// const textPlaceholder = randomPlaceholder('text')
// const textAreaPlaceholder = randomPlaceholder('textarea')

/**
 * 
 * @param {string} type - The Type of component being created by the form
 * @param {function} handleSubmit - submit handler callback
 * @param {function} cancel - cancel handler callback
 * @param {object} colors - Collection of colors to be used by the ColorSwitcher
 * @returns A Form Component
 */
export default function CreateForm ({type, colors, handleSubmit=placeholderFunction, cancel}) {

    const theme = useTheme();

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [color, setColor] = useState(null)
    const [textPlaceholder, setTextPlaceholder] = useState(randomPlaceholder('text'))
    const [textAreaPlaceholder, setTextAreaPlaceholder] = useState(randomPlaceholder('textarea'))

    // generate a quote only one mount and unmount
    useEffect(() => {
        setTextPlaceholder(randomPlaceholder('text'))
        setTextAreaPlaceholder(randomPlaceholder('textarea'))
    }, [])

    function submitHandler (e) {
        e.preventDefault()

        // bundle up the data
        const data = {
            id: v4(),
            title: title,
            body: body,
            color: color ? color : pickRandomColor(),
        }

        handleSubmit()
    }

    function handleCancel (e) {
        e.preventDefault()
        cancel()
    }

    const noteFormStyle ={
        display: 'flex',
        flexDirection: 'column',
        gap: '.5em',
    }

    const inputStyle = {
        color: theme.text,
        background: theme.textarea,
        borderBottom: `2px solid ${theme.text}`,
        borderRadius: '.25em',
        fontSize: '1.25em',
        width: '100%',
    }

    const inputFieldGroup = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '.5em',
    }

    const textAreaStyle = {
        background: theme.textarea,
        color: theme.textareaText,
        borderRadius: '.25em',
        width: '100%',
        fontSize: '1.25em',
        resize: 'none',
        height: '9em',
    }

    const formHeaderStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    }

    const formButtons = {
        display: 'flex',
        gap: '.5em',
    }

    // this will pick a random color if the color state does not change
    function pickRandomColor(){
        const c = Object.values(colors)
        const random = Math.floor(Math.random() * c.length)
        return colors[random]
    }

    const TextNoteForm = 
    <form onSubmit={handleSubmit} style={noteFormStyle} >
        <div style={formHeaderStyle}>
            <ColorSwitcher color={color} colors={colors} setColor={setColor} />
            <div style={formButtons}>
                <IconButton icon='❌' onClick={(e) => handleCancel(e)} />
                <IconButton icon='✅' submit onClick={submitHandler} />
            </div>
        </div>
        <div style={inputFieldGroup}>
            <input
                name='Note Title'
                style={inputStyle}
                placeholder={textPlaceholder}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
        </div>
        <textarea
            name='Note Body'
            style={textAreaStyle}
            placeholder={textAreaPlaceholder}
            value={body}
            onChange={(e) => setBody(e.target.value)}
        />
    </form>

    const LabelTextForm = 
    <form onSubmit={handleSubmit} >
        <ColorSwitcher currentColor={color} colors={colors} setColor={setColor} />
        <input
            style={inputStyle}
            placeholder={textPlaceholder}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
    </form>

    // TODO - Add Area Form

    // return component
    switch (type) {
        default:
            return TextNoteForm
        case 'label':
            return LabelTextForm
    }
}
