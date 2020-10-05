import React from "react"

import { DataContext } from "."
import { NodeType } from "components/Tree"
import { ZoomType } from "components/Zoom"

type Props = {
    tree?: NodeType
    zoom?: ZoomType
    forceTreeUpdate?: () => void,
    children?: React.ReactNode
}

export default function TreeUpdater(props: Props) {
    const { tree, zoom, forceTreeUpdate, children } = props
    const { setTree, setZoom, setForceTreeUpdate } = React.useContext(DataContext)

    React.useEffect(() => {
        if (tree) setTree(tree)
        if (zoom) setZoom(zoom)
        if (forceTreeUpdate) setForceTreeUpdate(forceTreeUpdate)
    }, [tree])

    return <>{children}</>
}
