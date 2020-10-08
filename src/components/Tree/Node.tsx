import React from "react"
import { useTheme } from "@material-ui/core"

import { Text } from "@visx/text"
import { NodeType } from "."
import { hasPositions, isExpanded } from "@utils"
import { LogoSVG } from "components/Logo"

const WIDTH = 75

const FONT_SIZE = "11px"
const TEXT_CENTER = 4

const TEXT_STYLE: React.CSSProperties = {
    fontSize: FONT_SIZE,
    // pointerEvents: "none",
    lineHeight: 10,
}

export type NodeProps = {
    node: NodeType
    width?: number
    height?: number
}

type CommonProps = {
    data: string
}

type RootProps = CommonProps & {
    width?: number
}

const RootNode = (props: RootProps) => {
    const { data, width = WIDTH } = props
    const radius = width / 2
    const theme = useTheme()
    const transform = "scale(0.25, 0.25) translate(-300, -200)"
    return (
        <>
            {/* <circle r={radius} fill="url('#root-node-color')" />
            <Text
                width={width}
                textAnchor="middle"
                verticalAnchor="middle"
                style={TEXT_STYLE}
            >
                {data}
            </Text> */}
            <circle r={40} cx={-25} fill="transparent"/>
            <LogoSVG fill={theme.palette.text.primary} transform={transform}/>
        </>
    )
}

type ParentProps = CommonProps & {
    isExpanded: boolean
    isFocused?: boolean
}

const ParentNode = (props: ParentProps) => {
    const { data, isExpanded, isFocused } = props
    const shapeWidth = 8
    const theme = useTheme()
    const [hover, setHover] = React.useState(false)

    return (
        <>
            <circle
                r={shapeWidth / 2}
                fill={isExpanded ? theme.palette.background.default : theme.treeColors.parentFill}
                stroke={theme.treeColors.parentStroke}
            />
            <text
                textAnchor="end"
                x={-shapeWidth}
                y={TEXT_CENTER}
                fill={
                    hover
                        ? theme.palette.primary.light
                        : theme.palette.text.primary
                }
                style={TEXT_STYLE}
                onMouseOver={() => setHover(true)}
                onMouseOut={() => setHover(false)}
            >
                {data}
            </text>
        </>
    )
}

type LeafProps = CommonProps & {}

const LeafNode = (props: LeafProps) => {
    const { data } = props
    const theme = useTheme()
    return (
        <text
            textAnchor="start"
            x={2}
            y={TEXT_CENTER}
            fill={theme.palette.text.primary}
            style={TEXT_STYLE}
        >
            {data}
        </text>
    )
}

export default function Node(props: NodeProps) {
    const { node } = props
    const isRoot = node.depth === 0
    const isParent = node.data.children && node.data.children.length > 0
    const textToShow = `${
        hasPositions(node.data.attributes.positions) ? "⭐" : ""
    }${node.data.name} '${node.data.attributes.year.substring(2)}`

    if (isRoot) {
        return <RootNode data={textToShow} />
    } else if (isParent) {
        return <ParentNode data={textToShow} isExpanded={isExpanded(node)} />
    } else {
        return <LeafNode data={textToShow} />
    }
}
