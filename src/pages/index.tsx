import React from "react"
import styled from "styled-components"
import { ParentSize } from "@visx/responsive"
import data from "assets/family-tree"
import Tree from "components/Tree"

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    background: linear-gradient(to right, #7F7FD5, #86A8E7, #91EAE4);
`

const StyledParentSize = styled(ParentSize)`
    display: grid;
    place-items: center;
`

export default function Home() {
    return (
        <Wrapper>
            <StyledParentSize>
                {size => <Tree width={size.width * 0.99} height={size.height * 0.99}></Tree>}
            </StyledParentSize>
        </Wrapper>
    )
}
