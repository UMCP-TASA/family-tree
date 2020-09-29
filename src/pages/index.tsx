import React from "react"
import styled from "styled-components"
import data from "assets/family-tree"

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
`

export default function Home() {
    console.log(data)
    return <Wrapper>Hello world!</Wrapper>
}
