import React from "react"
import { NodeType } from "components/Tree"
import { ZoomType } from "components/Zoom"
import { DataContext, DataContextValue } from "."

type Props = {
    children: React.ReactNode
}

export default function Provider(props: Props) {
    const { children } = props
    const [rawZoom, setZoom] = React.useState<ZoomType>()
    const [rawTree, setTree] = React.useState<NodeType>()
    const [rawWidth, setWidth] = React.useState(0)
    const [rawHeight, setHeight] = React.useState(0)

    const contextValue = React.useMemo(() => {
        function setData(newValue: DataContextValue) {
            const { zoom, tree, width, height} = newValue

            if(zoom) setZoom(zoom)
            if(tree) setTree(tree)
            if(width) setWidth(width)
            if(height) setHeight(height)
        }

        return {
            zoom: rawZoom,
            tree: rawTree,
            width: rawWidth,
            height: rawHeight,
            setData
        }
    }, [rawTree, rawZoom, rawWidth, rawHeight])

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    )
}