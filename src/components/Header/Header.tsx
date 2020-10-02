import React from "react"
import styled from "styled-components"

import { ZoomType } from "components/Zoom"
import { DataContext } from "components/DataContext"

type Props = {
    zoom: ZoomType
}

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: inline-grid;
`

export default function Header(props: Props) {
    const { zoom } = props
    const { tree } = React.useContext(DataContext)
    // console.log(tree)
    return (
        <Wrapper>

        </Wrapper>
    )
}