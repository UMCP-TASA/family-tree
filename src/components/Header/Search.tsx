import React from "react"
import { makeStyles, TextField} from "@material-ui/core"
import { ZoomType } from "components/Zoom"
import { NodeType } from "components/Tree"
import { findNodeFromName } from "@utils"

type Props = {
    zoom?: ZoomType
    tree?: NodeType
    width?: number,
    height?: number,
}

export default function Search(props: Props) {
    const { zoom, tree, width = 100, height = 100 } = props
    const [focusedNode, setFocusedNode] = React.useState<NodeType>()
 
    return (
        <TextField
            id="search-field"
            label="Search"
            color="secondary"
            variant="outlined"
            margin="dense"
            fullWidth
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
