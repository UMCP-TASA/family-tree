import React from "react"
import styled from "styled-components"
import { ZoomContainer, ZoomSVG } from "components/Zoom"
import data from "assets/family-tree"
import Tree from "components/Tree"
import Header from "components/Header"
import { DataProvider } from "components/DataContext"

/*
 * Have to do this annoying workaround because we need the zoom components
 * in the header controls. I know it's ugly :(
 */
const HEADER_HEIGHT = 5

const Wrapper = styled.div`
    width: 100vw;
    height: ${100 - HEADER_HEIGHT}vh;
    display: grid;
    place-items: center;
`

const HeaderWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${HEADER_HEIGHT}vh;
    background: #03c0dc;
`

const BodyWrapper = styled.div`
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
            <DataProvider>
                <ZoomContainer>
                    {({ width, height, zoom }) => (
                        <>
                            <HeaderWrapper>
                                <Header zoom={zoom} />
                            </HeaderWrapper>
                            <BodyWrapper>
                                <ZoomSVG
                                    width={width}
                                    height={height}
                                    zoom={zoom}
                                >
                                    <Tree
                                        width={width}
                                        height={height}
                                        data={data}
                                    />
                                </ZoomSVG>
                            </BodyWrapper>
                        </>
                    )}
                </ZoomContainer>
            </DataProvider>
        </Wrapper>
    )
}
