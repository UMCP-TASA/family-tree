import React from "react"
import styled from "styled-components"
import {Link} from "gatsby"

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`

const Header = styled.h1`
    text-align: center;
`

const StyledLink = styled(Link)``

export default function NotFoundPage() {
    return (
        <Wrapper>
            <Header>Oops page couldn't be found</Header>
            <StyledLink to="/">Return to Family Tree</StyledLink>
        </Wrapper>
    )
}