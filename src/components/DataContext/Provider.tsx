import { HierarchyNode, HierarchyPointNode } from "@visx/hierarchy/lib/types"
import { NodeType } from "components/Tree"
import React from "react"
import { DataContext } from "."

type Props = {
    children: React.ReactNode
}

export default function Provider(props: Props) {
    const { children } = props
    const [rawTree, rawSetTree] = React.useState<NodeType>()

    const contextValue = React.useMemo(() => {
        function setTree(newValue: NodeType) {
            rawSetTree(newValue)
        }

        return {
            tree: rawTree,
            setTree
        }
    }, [rawTree, rawSetTree])

    return (
        <DataContext.Provider
            value={contextValue}
        >
            {children}
        </DataContext.Provider>
    )
}
