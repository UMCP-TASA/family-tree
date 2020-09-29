import React from "react"
import { Text } from "@visx/text"
import { Tree as VisTree } from "@visx/hierarchy"
import { hierarchy } from "d3-hierarchy"

export type TreeData = {
    attributes: {
        description: string,
        familySize: number,
        id: string,
        positions: string[],
        year: string,
    },
    isExpanded?: boolean
    name: string,
    children: TreeData[],
}

export type TreeProps = {
    width: number
    height: number
    data: TreeData
    orientation?: "horizontal" | "vertical",
}

export default function Tree(props: TreeProps) {
    const { width, height, data } = props

    const root = hierarchy(data)
    return (
        <g>
            <VisTree top={0} left={0} root={root} />
        </g>
    )
}
