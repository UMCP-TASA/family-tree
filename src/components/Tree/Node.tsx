import React from "react"
import { Text } from "@visx/text"
import { TextProps } from "@visx/text/lib/Text"

import { NodeType } from "."
import { isExpanded } from "@utils"

const WIDTH = 50
const HEIGHT = 25

const FONT_OPTIONS: TextProps = {
    textAnchor: "middle",
    verticalAnchor: "middle",
    fontSize: "9px",
    style: {
        pointerEvents: "none",
    },
}

export type NodeProps = {
    node: NodeType
    width?: number,
    height?: number,
}

const RootNode = (props: NodeProps) => {
    const { node, width = WIDTH, height = HEIGHT } = props
    const radius = width / 2
    const textWidth = radius * 2
    return (
        <>
            <circle r={radius} fill="url('#root-node-color')" />
            <Text width={textWidth} fill="#71248e" {...FONT_OPTIONS}>
                {node.data.name}
            </Text>
        </>
    )
}

const ParentNode = (props: NodeProps) => {
    const { node, width = WIDTH, height = HEIGHT } = props
    const isFocused = node.data.isFocused // not currently working without way to force tree to update
    return (
        <>
            <rect
                width={width}
                height={height}
                x={-width / 2}
                y={-height / 2}
                fill="#272b4d"
                stroke={isFocused ? "green" : "#03c0dc"}
                strokeWidth={1}
            />
            <Text
                width={width}
                fill={isExpanded(node) ? "white" : "#26deb0"}
                {...FONT_OPTIONS}
            >
                {node.data.name}
            </Text>
        </>
    )
}

const LeafNode = (props: NodeProps) => {
    const { node, width = WIDTH, height = HEIGHT } = props
    return (
        <>
            <rect
                width={width}
                height={height}
                x={-width / 2}
                y={-height / 2}
                fill="none"
                stroke="#26deb0"
                strokeDasharray={"2,2"}
                strokeOpacity={0.6}
                rx={12}
            />
            <Text width={width} fill="#26deb0" {...FONT_OPTIONS}>
                {node.data.name}
            </Text>
        </>
    )
}

export default function Node(props: NodeProps) {
    const { node, width = WIDTH, height = HEIGHT } = props


    if (node.depth === 0) {
        return <RootNode node={node} width={width} height={height} />
    } else if (node.data.children && node.data.children.length > 0) {
        return <ParentNode node={node} width={width} height={height} />
    } else {
        return <LeafNode node={node} width={width} height={height} />
    }
}
