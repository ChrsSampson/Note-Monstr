// icon button

import {useTheme} from "@emotion/react";
import styled from "@emotion/styled";

const Button = styled.button`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${() => useTheme().text};
    background: none;
    border: none;
    border-radius: 50%;
    font-size: 1.3em;
    cursor: pointer;
    transition: 0.5s;
    label{
        transition: 0.5s;
        font-size: 0.5em;
        color: ${() => useTheme().text};
        opacity: 0;
    }
    &:hover{
        transition: 0.5s;
        label{
            opacity: 1;
        }
    }
`

export default function IconButton({icon="🍌", label, onClick, submit}) {

    return(
        <Button type={submit ? "submit" : 'button'} onClick={onClick}>
            {
                label ? <label>{label}</label> : null
            }
            {icon}
        </Button>       
    )
}