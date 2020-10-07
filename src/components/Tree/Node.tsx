import React from "react"
import { Container, useTheme } from "@material-ui/core"

import { Text } from "@visx/text"
import { TextProps } from "@visx/text/lib/Text"
import { NodeType } from "."
import { isExpanded } from "@utils"


const WIDTH = 75
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
    width?: number
    height?: number
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
            {/* <LogoSVG width={width} height={width}/> */}
        </>
    )
}

const ParentNode = (props: NodeProps) => {
    const { node, width = WIDTH, height = HEIGHT } = props
    const isFocused = node.data.isFocused // not currently working without way to force tree to update
    const theme = useTheme()
    return (
        <>
            <rect
                width={width}
                height={height}
                x={-width / 2}
                y={-height / 2}
                fill={theme.palette.background.default}
                stroke={theme.palette.parentNode.main}
                strokeWidth={1}
            />
            <Text
                width={width}
                fill={
                    isExpanded(node)
                        ? theme.palette.parentNode.contrastText
                        : theme.palette.leafNode.contrastText
                }
                {...FONT_OPTIONS}
            >
                {node.data.name}
            </Text>
        </>
    )
}

const LeafNode = (props: NodeProps) => {
    const { node, width = WIDTH, height = HEIGHT } = props
    const theme = useTheme()
    return (
        <>
            <rect
                width={width}
                height={height}
                x={-width / 2}
                y={-height / 2}
                fill="none"
                stroke={theme.palette.leafNode.main}
                strokeDasharray={"2,2"}
                strokeOpacity={0.6}
                rx={12}
            />
            <Text
                width={width}
                fill={theme.palette.leafNode.contrastText}
                {...FONT_OPTIONS}
            >
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
