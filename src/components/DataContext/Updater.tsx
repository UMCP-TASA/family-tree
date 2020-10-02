import React from "react"

import { DataContext } from "."
import { NodeType } from "components/Tree"
import { ZoomType } from "components/Zoom"

type Props = {
    tree?: NodeType
    zoom?: ZoomType
}

export default function TreeUpdater(props: Props) {
    const { tree, zoom } = props
    const { setTree, setZoom } = React.useContext(DataContext)

    React.useEffect(() => {
        if (tree) setTree(tree)
        if (zoom) setZoom(zoom)
    }, [tree])

    return <></>
}
