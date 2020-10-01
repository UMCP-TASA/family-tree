import React from "react"
import styled from "styled-components"
import { ParentSize } from "@visx/responsive"
import { ZoomContainer, ZoomSVG, ZoomType } from "components/Zoom"
import data from "assets/family-tree"
import Tree from "components/Tree"

const HEADER_HEIGHT = 5

const Wrapper = styled.div`
    width: 100vw;
    height: ${100 - HEADER_HEIGHT}vh;
    display: grid;
    place-items: center;
`

const Header = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${HEADER_HEIGHT}vh;
    background: red;
`

const Body = styled.div`
    position: absolute;
    top: ${HEADER_HEIGHT}vh;
    left: 0;
    width: 100%;
    height: ${100 - HEADER_HEIGHT}vh;
    background: #272b4d;
`

export default function Home() {
    return (
        <Wrapper>
            <ZoomContainer>
                {({ width, height, zoom }) => (
                    <>
                        <Header />
                        <Body>
                            <ZoomSVG width={width} height={height} zoom={zoom}>
                                <Tree
                                    width={width}
                                    height={height}
                                    data={data}
                                />
                            </ZoomSVG>
                        </Body>
                    </>
                )}
            </ZoomContainer>
        </Wrapper>
    )
}
