import React from "react"
import styled from "styled-components"
import { ZoomContainer, ZoomSVG } from "components/Zoom"
import data from "assets/family-tree"
import Tree from "components/Tree"
import Header from "components/Header"
import { DataProvider, DataUpdater } from "components/DataContext"

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    grid-template-rows: 5% 1fr;
`

const BodyWrapper = styled.div`
    width: 100%;
    height: 100%;
    background: #272b4d;
`

export default function Home() {
    return (
        <DataProvider>
            <Wrapper>
                <Header />
                <BodyWrapper>
                    <ZoomContainer>
                        {({ width, height, zoom }) => (
                            <>
                                <DataUpdater data={{ width, height, zoom }} />
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
                            </>
                        )}
                    </ZoomContainer>
                </BodyWrapper>
            </Wrapper>
        </DataProvider>
    )
}
