import React from "react"
import styled from "styled-components"

import { ZoomType } from "components/Zoom"
import { DataContext } from "components/DataContext"
import Search from "./Search"

type Props = {}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: #03c0dc;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: 1fr;
    align-items: center;
    justify-items: space-between;
`
const HomeWrapper = styled.div`
    grid-column: 1 / span 2;
`

const SearchWrapper = styled.div`
    grid-column: 5 / span 3;
    padding: 8px;
`

const ControlWrapper = styled.div`
    grid-column: 11 / span 2;
`

export default function Header(props: Props) {
    //const { zoom } = props
    const { zoom, tree, width, height } = React.useContext(DataContext)

    return (
        <Wrapper>
            <HomeWrapper />
            <SearchWrapper>
                <Search zoom={zoom} tree={tree} width={width} height={height}/>
            </SearchWrapper>

            <ControlWrapper>
                <button onClick={zoom?.center}>Center</button>
                <button onClick={zoom?.reset}>Reset</button>
                <button onClick={zoom?.clear}>Clear</button>
            </ControlWrapper>
        </Wrapper>
    )
}
