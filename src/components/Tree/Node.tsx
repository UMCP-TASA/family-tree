import React from "react"
import { Text } from "@visx/text"
import { TextProps } from "@visx/text/lib/Text"
import { Group } from "@visx/group"

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
    onNodeClick: (node: NodeType) => void
}

const RootNode = (props: NodeProps) => {
    const { node, onNodeClick } = props
    const radius = WIDTH / 2
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
    const { node, onNodeClick } = props
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
                fill="#272b4d"
                stroke={"#03c0dc"}
                strokeWidth={1}
            />
            <Text
                width={WIDTH}
                fill={isExpanded(node) ? "white" : "#26deb0"}
                {...FONT_OPTIONS}
            >
                {node.data.name}
            </Text>
        </>
    )
}

const LeafNode = (props: NodeProps) => {
    const { node, onNodeClick } = props
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
                stroke="#26deb0"
                strokeDasharray={"2,2"}
                strokeOpacity={0.6}
                rx={12}
            />
            <Text width={WIDTH} fill="#26deb0" {...FONT_OPTIONS}>
                {node.data.name}
            </Text>
        </>
    )
}

export default function Node(props: NodeProps) {
    const { node, onNodeClick } = props
    let displayedNode = <></>

    if (node.depth === 0) {
        displayedNode = <RootNode node={node} onNodeClick={onNodeClick} />
    } else if (node.data.children && node.data.children.length > 0) {
        displayedNode = <ParentNode node={node} onNodeClick={onNodeClick} />
    } else {
        displayedNode = <LeafNode node={node} onNodeClick={onNodeClick} />
    }

    return (
        <Group
            top={node.x}
            left={node.y}
            onClick={() => onNodeClick(node)}
            style={{ cursor: "pointer" }}
        >
            {displayedNode}
        </Group>
    )
}
