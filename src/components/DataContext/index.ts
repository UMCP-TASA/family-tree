import React from "react"

import { NodeType } from "components/Tree"
import { ZoomType } from "components/Zoom"

export { default as DataProvider } from "./Provider"
export { default as DataConsumer } from "./Consumer"
export { default as DataUpdater } from "./Updater"

export type DataContextValue = {
    zoom?: ZoomType
    tree?: NodeType
    width?: number
    height?: number
}

export type DataContextType = DataContextValue & {
    setData: (value: DataContextValue) => void
}

export const DataContext = React.createContext<DataContextType>({
    setData: __ => {},
})