import React from "react"
import { Tree as VisTree, hierarchy } from "@visx/hierarchy"
import { TreeData } from "./index"
import { Group } from "@visx/group"
import { LinearGradient } from "@visx/gradient"
// import { LinkHorizontal } from "@visx/shape"

import Nodes from "./Nodes"
import Links from "./Links"
import useForceUpdate from "hooks/useForceUpdate"
import { isExpanded } from "@utils"
import { DataUpdater } from "components/DataContext"

export type TreeProps = {
    width: number
    height: number
    data: TreeData
    orientation?: "horizontal" | "vertical"
}

function Tree(props: TreeProps) {
    const { width, height, data } = props
    const yMax = height
    const xMax = width

    const forceUpdate = useForceUpdate()
    const root = hierarchy(data, d =>
        d.isExpanded == undefined || d.isExpanded ? d.children : null
    )

    return (
        <g>
            <LinearGradient id="root-node-color" from="#fd9b93" to="#fe6e9e" />
            <VisTree<TreeData>
                size={[yMax, xMax]}
                root={root}
                separation={(a, b) =>
                    (a.parent == b.parent ? 10 : 5)
                }
            >
                {tree => (
                    <>
                        <DataUpdater data={{tree}}/>
                        <Group top={0} left={0}>
                            <g id="links-group">
                                <Links links={tree.links()} />
                            </g>
                            <g id="nodes-group">
                                <Nodes
                                    nodes={tree.descendants()}
                                    onNodeClick={node => {
                                        if (!isExpanded(node)) {
                                            node.data.x0 = node.x
                                            node.data.y0 = node.y
                                        }
                                        node.data.isExpanded = !isExpanded(node)
                                        // context.setTree(tree)
                                        forceUpdate()
                                    }}
                                />
                            </g>
                        </Group>
                    </>
                )}
            </VisTree>
        </g>
    )
}

export default React.memo(Tree)
