

import styled from '@emotion/styled'
import {useTheme} from '@emotion/react'

const FAB = styled.button`
    display: grid;
    place-items: center;
    background: ${() => useTheme().button.primary};
    color: ${() => useTheme().text};
    border-radius: 50%;
    border: none;
    width: 3.5rem;
    height: 3.5rem;
    transition: 0.5s cubic-bezier(.56,-0.09,.55,1.25);
    &:hover{
        cursor: pointer;
        filter: brightness(1.2);
        transition: 0.3s cubic-bezier(.56,-0.09,.55,1.25);
        transform: scale(1.1);
    }
    &:active{
        filter: brightness(.75);
        transform: scale(.9);
        transition: 0.1s cubic-bezier(.56,-0.09,.55,1.25);
    }
`
const Wrapper = styled.div`
    display: grid;
    place-items: center;
    label{
        text-align: center;
        opacity: 0;
        transition: 0.5s;
    }
    &:hover{
        label{
            opacity: 1;
            transition: 0.5s;
        }
    }
`
const Label = styled.label`
    color: ${() => useTheme().text};
`

export default function FloatingActionButton ({onClick, icon='🍌', label = null}) {
    const theme = useTheme();
    return (
        <Wrapper>
            <FAB onClick={onClick}>
                {icon}
            </FAB>
            {/* this needs some work */}
            {
                label &&
                <Label>
                    {label}
                </Label>
            }
        </Wrapper>
    )
}