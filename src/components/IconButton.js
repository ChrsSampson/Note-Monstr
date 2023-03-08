// icon button

import {useTheme} from "@emotion/react";
import styled from "@emotion/styled";

export default function IconButton({icon="🍌", label, onClick, size}) {
    const theme = useTheme()

    const Button = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${theme.text};
    background: none;
    border: none;
    border-radius: 50%;
    font-size: ${size || '1.3em'};
    cursor: pointer;
    transition: 0.5s;
    label{
        transition: 0.5s;
        font-size: 0.5em;
        color: ${theme.text};
        opacity: 0;
    }
    &:hover{
        transition: 0.2s;
        transform: scale(1.1);
        label{
            opacity: 1;
        }
    }
    &:active{
        transition: 0.2s;
        transform: scale(0.9);
    }
`


    return(
        <Button onClick={onClick}>
            {
                label ? <label>{label}</label> : null
            }
            {icon}
        </Button>       
    )
}