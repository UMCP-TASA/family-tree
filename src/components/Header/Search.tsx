import React from "react"
import styled from "styled-components"
import { ZoomType } from "components/Zoom"
import { NodeType } from "components/Tree"
import TextInput from "components/TextInput"
import { findNodeFromName } from "@utils"

type Props = {
    zoom?: ZoomType
    tree?: NodeType
}

const Wrapper = styled.div`
    position: relative;
    width: 700px;
`

export default function Search(props: Props) {
    const { zoom, tree } = props
    const [nameToFind, setNameToFind] = React.useState<string>("")
    const width = 2028
    const height = 1253
    return (
        <TextInput
            onChange={e => {
                const nameToFind = e.target.value
                if (nameToFind && nameToFind !== "" && tree && zoom) {
                    const matches = findNodeFromName(nameToFind, tree)

                    if (matches.length > 0) {                       
                        const x = matches[0].y - width/2
                        const y = matches[0].x - height/2
                                  
                        zoom.translateTo({
                            x: -x, y: -y,
                        })
                    }
                }
                //setNameToFind(e.target.value)
            }}
        ></TextInput>
    )
}
