import React from "react"
import { Text } from "@visx/text"
import { Tree as VisTree, hierarchy } from "@visx/hierarchy"
import { NodeType, TreeData } from "./index"
import { Group } from "@visx/group"
import Links from "./Links"
import Nodes from "./Nodes"
import { LinkHorizontal } from "@visx/shape"

export type TreeProps = {
    width: number
    height: number
    data: TreeData
    orientation?: "horizontal" | "vertical"
}

export default function Tree(props: TreeProps) {
    const { width, height, data } = props
    const yMax = height
    const xMax = width

    const root = React.useMemo(() => hierarchy(data), [])
    return (
        <g>
            <VisTree<TreeData> size={[yMax, xMax]} root={root}>
                {tree => (
                    <Group top={0} left={0}>
                        <g>
                            {tree.links().map((link, i) => (
                                <LinkHorizontal
                                    data={link}
                                    stroke="green"
                                    fill="none"
                                    key={`link-${i}`}
                                />
                            ))}
                        </g>
                        <g>
                            <Nodes nodes={tree.descendants()} />
                        </g>
                    </Group>
                )}
            </VisTree>
        </g>
    )
}
