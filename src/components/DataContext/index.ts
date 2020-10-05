import React from "react"

import { NodeType } from "components/Tree"
import { ZoomType } from "components/Zoom"

export { default as DataProvider } from "./Provider"
export { default as DataConsumer } from "./Consumer"
export { default as DataUpdater } from "./Updater"

// export type DataContextValue = {
//     zoom?: ZoomType,
//     tree?: NodeType,
//     width?: number,
//     height?: number,
// }

export type DataContextType = {
    zoom?: ZoomType
    setZoom: (zoom: ZoomType) => void
    tree?: NodeType
    setTree: (value: NodeType) => void
    forceTreeUpdate: () => void
    setForceTreeUpdate: (value: () => void) => void
}

export const DataContext = React.createContext<DataContextType>({
    setZoom: __ => {
        return
    },
    setTree: __ => {
        return
    },
    forceTreeUpdate: () => {
        console.log("Force tree update not yet set")
        return
    },
    setForceTreeUpdate: () => {
        return
    },
})
