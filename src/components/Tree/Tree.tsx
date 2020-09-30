import React from "react"
import { Tree as VisTree, hierarchy } from "@visx/hierarchy"
import { TreeData } from "./index"
import { Group } from "@visx/group"
import { LinearGradient } from "@visx/gradient"
import Nodes from "./Nodes"
import { LinkHorizontal } from "@visx/shape"
import useForceUpdate from "hooks/useForceUpdate"
import { isExpanded } from "@utils"

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
                    (a.parent == b.parent ? 20 : 10) / a.depth
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
                                    if (!isExpanded(node)) {
                                        node.data.x0 = node.x
                                        node.data.y0 = node.y
                                    }
                                    node.data.isExpanded = !isExpanded(node)
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
