import React from "react"
import { Tree as VisTree, hierarchy } from "@visx/hierarchy"
import { TreeData } from "./index"
import { Group } from "@visx/group"
import { GradientPinkBlue, LinearGradient } from "@visx/gradient"
import Nodes from "./Nodes"
import { LinkHorizontal } from "@visx/shape"
import useForceUpdate from "hooks/useForceUpdate"

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

    const forceUpdate = useForceUpdate()
    const root = React.useMemo(
        () =>
            hierarchy(data, d =>
                d.isExpanded == undefined || d.isExpanded ? d.children : null
            ),
        [forceUpdate]
    )
    return (
        <g>
            <LinearGradient id="root-node-color" from="#fd9b93" to="#fe6e9e" />
            <VisTree<TreeData>
                size={[yMax, xMax]}
                root={root}
                separation={(a, b) =>
                    (a.parent == b.parent ? 1 : 0.5) / a.depth
                }
            >
                {tree => (
                    <Group top={0} left={0}>
                        <g>
                            {tree.links().map((link, i) => (
                                <LinkHorizontal
                                    data={link}
                                    stroke="rgb(254,110,158,0.6)"
                                    strokeWidth="1"
                                    fill="none"
                                    key={`link-${i}`}
                                />
                            ))}
                        </g>
                        <g>
                            <Nodes
                                nodes={tree.descendants()}
                                onNodeClick={node => {
                                    if (node.data.isExpanded == undefined)
                                        node.data.isExpanded = false
                                    else
                                        node.data.isExpanded = !node.data
                                            .isExpanded
                                    console.log(node)
                                    forceUpdate()
                                }}
                            />
                        </g>
                    </Group>
                )}
            </VisTree>
        </g>
    )
}
