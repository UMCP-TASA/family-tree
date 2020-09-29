import React from "react"
import styled from "styled-components"
import { ParentSize } from "@visx/responsive"
import ZoomContainer from "components/ZoomContainer"
import data from "assets/family-tree"
import Tree from "components/Tree"

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    background: #272b4d;
`

const StyledParentSize = styled(ParentSize)`
    display: grid;
    place-items: center;
`

export default function Home() {
    return (
        <Wrapper>
            <StyledParentSize>
                {size => (
                    <ZoomContainer
                        width={size.width * 0.99}
                        height={size.height * 0.99}
                    >
                        <Tree
                            width={size.width * 0.99}
                            height={size.height * 0.99}
                            data={data}
                        />
                    </ZoomContainer>
                )}
            </StyledParentSize>
        </Wrapper>
    )
}
