// // DEPRIECATED FILE

// import styled from "@emotion/styled";
// import { useTheme } from "@emotion/react";
// import { useState } from "react";
// import {v4} from 'uuid';
// import IconButton from "./IconButton";
// import ColorSwitcher from "./NoteColorSwitcher";

// const NoteArea = styled.div``

// const FormGroup = styled.div`
//     display: flex;
//     margin: .5em 0;
// `
// const ButtonGroup = styled.div`
//     display: flex;
//     justify-content: space-between;
// `

// const FormInput = styled.input`
//     background: none;
//     border: none;
//     color: ${() => useTheme().text};
//     border-bottom: 2px solid ${() => useTheme().text};
//     font-size: 1.25em;
//     width: 90%;
//     placeholder: ${() => useTheme().text};
// `


// export default function CreateAreaForm ({addArea, cancel, colors}) {

//     const [title, setTitle] = useState('')
//     const [colorSelected, setColorSelected] = useState('')

//     function handleSubmit(e){
//         e.preventDefault()
//         const id = v4()
//         const data = {
//             id: id,
//             title: title || 'Untitled',
//             color: colorSelected ? colorSelected : pickRandomColor(),
//             size: {
//                 width: 200,
//                 height: 200
//             },
//             position: {
//                 x: 200,
//                 y: 200
//             }
//         }

//         addArea(id, data)

//         setTitle('')
//     }

//     function closeForm () {
//         setTitle('')
//         cancel()
//     }

//     function pickRandomColor(){
//         const c = Object.values(colors)
//         const random = Math.floor(Math.random() * c.length)
//         return colors[random]
//     }

//     return(
//         <NoteArea>
//             <ButtonGroup>
//                 <FormGroup>
//                     <ColorSwitcher
//                         colors={colors}
//                         currentColor={colorSelected}
//                         setColor={setColorSelected} 
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <IconButton icon={"❌"} label="Cancel" onClick={closeForm} />
//                     <IconButton icon={"✅"} submit label="Looks Good" onClick={(e) => {handleSubmit(e)}} />
//                 </FormGroup>
//             </ButtonGroup>
//             <FormGroup>
//                 <FormInput type="text" placeholder="At your command..." value={title} onChange={(e)=> setTitle(e.target.value)} />
//             </FormGroup>
//         </NoteArea>
//     )
// }1