import React from "react"
import styled from "styled-components"
import { ZoomType } from "components/Zoom"
import { NodeType } from "components/Tree"
import TextInput from "components/TextInput"
import { findNodeFromName } from "@utils"
import { DataUpdater } from "components/DataContext"

type Props = {
    zoom?: ZoomType
    tree?: NodeType
    width?: number,
    height?: number,
}

const Wrapper = styled.div`
    position: relative;
    width: 700px;
`

export default function Search(props: Props) {
    const { zoom, tree, width = 100, height = 100 } = props
    const [focusedNode, setFocusedNode] = React.useState<NodeType>()
 
    return (
        <TextInput
            onChange={e => {
                const nameToFind = e.target.value
                if (nameToFind && nameToFind !== "" && tree && zoom) {
                    const matches = findNodeFromName(nameToFind, tree)

                    if (matches.length > 0) {
                        const node = matches[0]
                        node.data.isFocused = true
                        setFocusedNode(node)

                        const x = node.y - width / 2
                        const y = node.x - height / 2

                        zoom.translateTo({
                            x: -x,
                            y: -y,
                        })
                    } else {
                        if (focusedNode) {
                            focusedNode.data.isFocused = false
                            setFocusedNode(undefined)
                        }
                    }
                }
                //setNameToFind(e.target.value)
            }}
        />
    )
}
