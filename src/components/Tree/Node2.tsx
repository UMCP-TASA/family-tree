import React from "react"
import { useTheme } from "@material-ui/core"
import { animated } from "react-spring"
import { Text } from "@visx/text"
import { NodeType } from "."
import { isExpanded } from "@utils"

type Props = React.SVGAttributes<SVGGElement> & {
    node: NodeType
}

export default function Node(props: Props) {
    const { node, ...rest } = props
    const theme = useTheme()
    const width = 50
    const height = 25
    const isRoot = node.depth === 0
    const isParent = node.data.children && node.data.children.length > 0

    const centerX = -width / 2
    const centerY = -height / 2

    let shape = <></>
    let textFill = ""

    if (isRoot) {
        shape = <circle r={width / 2} fill="url('#root-node-color')" />
        textFill = "#71248e"
    } else if (isParent) {
        shape = (
            <rect
                width={width}
                height={height}
                x={centerX}
                y={centerY}
                fill={theme.palette.background.default}
                stroke={theme.palette.parentNode.main}
                strokeWidth={1}
            />
        )
        textFill = isExpanded(node)
            ? theme.palette.parentNode.contrastText
            : theme.palette.leafNode.contrastText
    } else {
        shape = (
            <rect
                width={width}
                height={height}
                x={centerX}
                y={centerY}
                fill="none"
                stroke={theme.palette.leafNode.main}
                strokeDasharray={"2,2"}
                strokeOpacity={0.6}
                rx={12}
            />
        )

        textFill = theme.palette.leafNode.contrastText
    }

    return (
        <g {...rest}>
            {shape}
            <Text
                width={width}
                fill={textFill}
                textAnchor="middle"
                verticalAnchor="middle"
                fontSize="9px"
                style={{ pointerEvents: "none" }}
            >
                {node.data.name}
            </Text>
        </g>
    )
}

export const AnimatedNode = animated(Node)