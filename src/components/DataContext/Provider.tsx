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
    const [rawForceUpdate, rawSetForceUpdate] = React.useState<() => void>(() => { console.log("Force update not yet implemented") })

    const contextValue = React.useMemo(() => {
        function setTree(newValue: NodeType) {
            rawSetTree(newValue)
        }

        function setZoom(newValue: ZoomType) {
            rawSetZoom(newValue)
        }

        function setForceTreeUpdate(newValue: () => void) {
            rawSetForceUpdate(newValue)
        }

        return {
            tree: rawTree,
            setTree,
            zoom: rawZoom,
            setZoom,
            forceTreeUpdate: rawForceUpdate,
            setForceTreeUpdate,
        }
    }, [rawTree, rawSetTree, rawZoom, rawSetZoom, rawForceUpdate, rawSetForceUpdate])

    return (
        <DataContext.Provider
            value={contextValue}
        >
            {children}
        </DataContext.Provider>
    )
}
