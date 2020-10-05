import React from "react"
import { useTransition, animated } from "react-spring"
import { Group } from "@visx/group"

import Node from "./Node"
import { NodeType } from "."
import { getTopLeft, findCollapsedParent } from "@utils"

type NodesProps = {
    nodes: NodeType[]
    onNodeClick: (node: NodeType) => void
}

const AnimatedGroup = animated(Group)

export default function Nodes(props: NodesProps) {
    const { nodes, onNodeClick } = props
    const transitions = useTransition(nodes, node => node.data.attributes.id, {
        from: node => {
            // const parentTopLeft = node.parent
            //     ? getTopLeft(node.parent)
            //     : { top: 0, left: 0 }
            return {
                opacity: 0,
                //...parentTopLeft,
            }
        },
        enter: node => {
            //const topLeft = getTopLeft(node)
            return {
                opacity: 1,
                //...topLeft,
            }
        },
        update: node => {
            //const topLeft = getTopLeft(node)
            return {
                opacity: 1,
                //...topLeft,
            }
        },
        leave: node => {
            // let collapsedParentPosition = {}
            // if (node.parent) {
            //     const collapsedParent = findCollapsedParent(node.parent)
            //     collapsedParentPosition = {
            //         top: collapsedParent.data.x0 ? collapsedParent.data.x0 : collapsedParent.x,
            //         left: collapsedParent.data.y0 ? collapsedParent.data.y0 : collapsedParent.y,
            //     }
            // } else {
            //     collapsedParentPosition = { top: 0, left: 0 }
            // }

            return {
                opacity: 0,
                //...collapsedParentPosition,
            }
        },
    })
    return (
        <>
            {nodes.map(node => (
                <Group
                    top={node.x}
                    left={node.y}
                    onClick={() => onNodeClick(node)}
                    style={{ cursor: "pointer" }}
                    id={node.data.attributes.id}
                    key={node.data.attributes.id}
                >
                    <Node node={node} />
                </Group>
            ))}
            {/* {transitions.map(({ item, key, props }) => (
                <AnimatedGroup
                    opacity={props.opacity}
                    top={item.x}
                    left={item.y}
                    //transform={`translate(${props.left?.getValue()}, ${props.top?.getValue()})`}
                    onClick={() => onNodeClick(item)}
                    style={{ cursor: "pointer" }}
                    id={key}
                    key={key}
                >
                    <Node node={item} onNodeClick={onNodeClick} />
                </AnimatedGroup>
            ))} */}
        </>
    )
}
