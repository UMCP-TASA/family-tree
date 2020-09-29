import React from "react"
import { Group } from "@visx/group"

import Node from "./Node"
import { NodeType } from "."

type NodesProps = {
    nodes: NodeType[]
}

export default function Nodes(props: NodesProps) {
    const { nodes } = props
    return (
        <>
            {nodes.map(node => (
                <Node node={node} key={node.data.attributes.id} />
            ))}
        </>
    )
}
