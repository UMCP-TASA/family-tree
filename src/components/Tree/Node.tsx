import React from "react"
import { Container, useTheme } from "@material-ui/core"

import { Text } from "@visx/text"
import { TextProps } from "@visx/text/lib/Text"
import { NodeType } from "."
import { isExpanded } from "@utils"

const WIDTH = 75
const HEIGHT = 25

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
            {/* <LogoSVG width={width} height={width}/> */}
        </>
    )
}

const ParentNode = (props: NodeProps) => {
    const { node, width = WIDTH, height = HEIGHT } = props
    const isFocused = node.data.isFocused // not currently working without way to force tree to update
    const expanded = isExpanded(node)
    const theme = useTheme()
    return (
        <>
            <rect
                width={width}
                height={height}
                x={-width / 2}
                y={-height / 2}
                fill={theme.palette.background.default}
                stroke={
                    expanded
                        ? theme.palette.leafNode.main
                        : theme.palette.parentNode.main
                }
                strokeDasharray={expanded ? "2,2" : "0,0"}
                strokeOpacity={expanded ? 0.6 : 1.0}
                rx={12}
            />
        </>
    )
}

const LeafNode = (props: NodeProps) => {
    const { node, width = WIDTH, height = HEIGHT } = props
    const theme = useTheme()
    return (
        <rect
            width={width}
            height={9}
            y={-4}
            fill="none"
        />
    )
}

export default function Node(props: NodeProps) {
    const { node, width = WIDTH, height = HEIGHT } = props
    const isRoot = node.depth === 0
    const isParent = node.data.children && node.data.children.length > 0
    const theme = useTheme()

    let shape = <></>
    let textFill = ""
    if (isRoot) {
        textFill = "#71248e"
        shape = <RootNode node={node} width={width} height={height} />
    } else if (isParent) {
        textFill = isExpanded(node)
            ? theme.palette.leafNode.contrastText
            : theme.palette.parentNode.contrastText

        shape = <ParentNode node={node} width={width} height={height} />
    } else {
        textFill = theme.palette.leafNode.contrastText
        shape = <LeafNode node={node} width={width} height={height} />
    }

    return (
        <>
            {shape}
            <Text
                width={isRoot || isParent ? width : width * 2}
                fill={textFill}
                textAnchor={isRoot || isParent ? "middle" : "start"}
                verticalAnchor="middle"
                fontSize="9px"
                style={{
                    pointerEvents: "none",
                }}
            >
                {`${node.data.name} '${node.data.attributes.year.substring(2)}`}
            </Text>
        </>
    )
}
