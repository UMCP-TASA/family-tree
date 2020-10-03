import React from "react"

import { DataContext } from "."
import { NodeType } from "components/Tree"
import { ZoomType } from "components/Zoom"

type Props = {
    tree?: NodeType
    zoom?: ZoomType
    children?: React.ReactNode
}

export default function TreeUpdater(props: Props) {
    const { tree, zoom, children } = props
    const { setTree, setZoom } = React.useContext(DataContext)

    React.useEffect(() => {
        if (tree) setTree(tree)
        if (zoom) setZoom(zoom)
    }, [tree])

    return <>{children}</>
}
