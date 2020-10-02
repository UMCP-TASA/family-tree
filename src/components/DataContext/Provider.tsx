import { HierarchyNode, HierarchyPointNode } from "@visx/hierarchy/lib/types"
import { NodeType } from "components/Tree"
import { ZoomType } from "components/Zoom"
import React from "react"
import { DataContext } from "."

type Props = {
    children: React.ReactNode
}

export default function Provider(props: Props) {
    const { children } = props
    const [rawTree, rawSetTree] = React.useState<NodeType>()
    const [rawZoom, rawSetZoom] = React.useState<ZoomType>()

    const contextValue = React.useMemo(() => {
        function setTree(newValue: NodeType) {
            rawSetTree(newValue)
        }

        function setZoom(newValue: ZoomType) {
            rawSetZoom(newValue)
        }

        return {
            tree: rawTree,
            setTree,
            zoom: rawZoom,
            setZoom,
        }
    }, [rawTree, rawSetTree, rawZoom, rawSetZoom])

    return (
        <DataContext.Provider
            value={contextValue}
        >
            {children}
        </DataContext.Provider>
    )
}
