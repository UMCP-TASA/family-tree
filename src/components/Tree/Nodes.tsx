import React from "react"
import { useTransition, animated } from "react-spring"

import Node from "./Node"
import { NodeType } from "."
import { getTopLeft, findCollapsedParent } from "@utils"

type NodesProps = {
    nodes: NodeType[]
    onNodeClick: (node: NodeType) => void
}

export default function Nodes(props: NodesProps) {
    const { nodes, onNodeClick } = props
    const transitions = useTransition(nodes, node => node.data.attributes.id, {
        from: node => {
            const parentTopLeft = node.parent
                ? getTopLeft(node.parent)
                : { top: 0, left: 0 }
            return {
                opacity: 0,
                ...parentTopLeft,
            }
        },
        enter: node => {
            const topLeft = getTopLeft(node)
            return {
                opacity: 1,
                ...topLeft,
            }
        },
        update: node => {
            const topLeft = getTopLeft(node)
            return {
                opacity: 1,
                ...topLeft,
            }
        },
        leave: node => {
            let collapsedParentPosition = {}
            if (node.parent) {
                const collapsedParent = findCollapsedParent(node.parent)
                collapsedParentPosition = {
                    top: collapsedParent.data.x0 ? collapsedParent.data.x0 : collapsedParent.x,
                    left: collapsedParent.data.y0 ? collapsedParent.data.y0 : collapsedParent.y,
                }
            } else {
                collapsedParentPosition = { top: 0, left: 0 }
            }

            return {
                opacity: 0,
                ...collapsedParentPosition,
            }
        },
    })
    return (
        <>
            {/* {nodes.map(node => (
                <Node
                    node={node}
                    key={node.data.attributes.id}
                    onNodeClick={onNodeClick}
                />
            ))} */}
            {transitions.map(({ item, key, props }) => (
                <animated.g
                    opacity={props.opacity}
                    transform={`translate(${props.left}, ${props.top})`}
                    key={key}
                >
                    <Node node={item} onNodeClick={onNodeClick} />
                </animated.g>
            ))}
        </>
    )
}
