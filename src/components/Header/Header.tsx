import React from "react"
import styled from "styled-components"

import { ZoomType } from "components/Zoom"
import { DataContext } from "components/DataContext"
import Search from "./Search"

type Props = {

}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: #03c0dc;
    display: inline-grid;
`

export default function Header(props: Props) {
    //const { zoom } = props
    const { zoom, tree } = React.useContext(DataContext)

    return (
        <Wrapper>
            <Search zoom={zoom} tree={tree} />
            <button onClick={zoom?.center}>Center</button>
        </Wrapper>
    )
}