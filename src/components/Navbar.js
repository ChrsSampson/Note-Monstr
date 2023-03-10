
import styled from '@emotion/styled'
import FloatingActionButton from './FloatingActionButton'

import {SiMonster} from 'react-icons/si'

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const TitleWrapper = styled.div`
    display: flex;
    align-items: center;
`
const Title = styled.h1`
    border-bottom: 3px solid;
`

export default function Navbar({ changeTheme, themeMode }) {
    return (
        <Nav>
            <TitleWrapper>
                <Title>Note <SiMonster />onstr</Title>
            </TitleWrapper>
            <FloatingActionButton onClick={changeTheme} size={"1.5em"} icon={themeMode === 'dark' ? '🌞' : '🌙'} />
        </Nav>
    )
}