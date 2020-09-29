import React from "react"
import { Text } from "@visx/text"

import { NodeType } from "."
import { Group } from "@visx/group"

export type NodeProps = {
    node: NodeType
}

export default function Node(props: NodeProps) {
    const { node } = props
    const width = 40
    const height = 20

    return (
        <Group top={node.x} left={node.y}>
            <rect
                width={width}
                height={height}
                x={-width / 2}
                y={-height / 2}
                fill="red"
            />
            <Text
                width={width}
                fontSize={9}
                fontFamily="Arial"
                textAnchor="middle"
                verticalAnchor="middle"
            >
                {node.data.name}
            </Text>
        </Group>
    )
}
