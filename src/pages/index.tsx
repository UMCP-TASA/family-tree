import React from "react"
import styled from "styled-components"
import { ParentSize } from "@visx/responsive"
import data from "assets/family-tree"
import Tree from "components/tree"

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
`

export default function Home() {
    return (
        <Wrapper>
            <ParentSize>
                {size => <Tree width={size.width * 0.9} height={size.height * 0.9}></Tree>}
            </ParentSize>
        </Wrapper>
    )
}
