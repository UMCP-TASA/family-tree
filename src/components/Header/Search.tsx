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
                        //console.log(`Midpoint: ${width / 2}, ${height / 2}`)
                        //console.log(`Node: ${matches[0].x}, ${matches[0].y}`)
                        
                        const x = matches[0].x - width/2
                        const y = matches[0].y - height/2
                        // zoom.translateTo({
                        //     x: 0,
                        //     y: 0,
                        // })
                        //console.log(`Translate: ${x}, ${y}`)
                        
                        zoom.translateTo({
                            x: -x, y: -y,
                        })
                        //console.log(`New zoom: ${zoom.transformMatrix.translateX}, ${zoom.transformMatrix.translateY}`)
                        console.log(zoom.toString())
                    } else {
                        console.log("no matches found")
                    }
                }
                //setNameToFind(e.target.value)
            }}
        ></TextInput>
    )
}
