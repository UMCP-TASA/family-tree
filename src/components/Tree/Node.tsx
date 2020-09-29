import React from "react"
import { Text } from "@visx/text"
import { TextProps } from "@visx/text/lib/Text"

import { NodeType } from "."
import { Group } from "@visx/group"

const WIDTH = 40
const HEIGHT = 20

const FONT_OPTIONS: TextProps = {
    textAnchor: "middle",
    verticalAnchor: "middle",
    fontSize: "9px",
}

export type NodeProps = {
    node: NodeType
}

const RootNode = (props: NodeProps) => {
    const { node } = props
    const radius = WIDTH / 2
    const textWidth = radius * 2
    return (
        <>
            <circle r={radius} fill="url('#root-color')" />
            <Text
                width={textWidth}
                {...FONT_OPTIONS}
            >
                {node.data.name}
            </Text>
        </>
    )
}

const ParentNode = (props: NodeProps) => {
    const { node } = props
    const center = {
        x: -WIDTH / 2,
        y: -HEIGHT / 2,
    }
    return (
        <>
            <rect
                width={WIDTH}
                height={HEIGHT}
                {...center}
                fill="none"
                stroke="green"
            />
            <Text
                width={WIDTH}
                {...FONT_OPTIONS}
            >
                {node.data.name}
            </Text>
        </>
    )
}

const LeafNode = (props: NodeProps) => {
    const { node } = props
    const center = {
        x: -WIDTH / 2,
        y: -HEIGHT / 2,
    }
    return (
        <>
            <rect
                width={WIDTH}
                height={HEIGHT}
                {...center}
                fill="none"
                stroke="blue"
                rx={12}
            />
            <Text
                width={WIDTH}
                {...FONT_OPTIONS}
            >
                {node.data.name}
            </Text>
        </>
    )
}

export default function Node(props: NodeProps) {
    const { node } = props
    let displayedNode = <></>

    if (node.depth === 0) {
        displayedNode = <RootNode node={node} />
    } else if (node.children && node.children.length > 0) {
        displayedNode = <ParentNode node={node} />
    } else {
        displayedNode = <LeafNode node={node} />
    }

    return (
        <Group top={node.x} left={node.y}>
            {displayedNode}
        </Group>
    )
}
