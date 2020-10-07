import React from "react"
import { useTransition, animated } from "react-spring"

import Node from "./Node"
import { NodeType } from "."
import { getTopLeft, findCollapsedParent, getX0, getY0 } from "@utils"

type NodesProps = {
    nodes: NodeType[]
    onNodeClick: (node: NodeType) => void
}

const transformString = ({ top, left }: { top: number; left: number }) =>
    `translate(${left}, ${top})`

export default function Nodes(props: NodesProps) {
    const { nodes, onNodeClick } = props
    const transitions = useTransition(
        nodes,
        {
            //const transitions = useTransition(nodes, node => node.data.attributes.id, {
            key: node => node.data.attributes.id,
            from: node => {
                const parentTopLeft = node.parent
                    ? getTopLeft(node.parent)
                    : { top: 0, left: 0 }
                return {
                    opacity: 0,
                    transform: transformString(parentTopLeft),
                }
            },
            enter: node => {
                const topLeft = getTopLeft(node)
                return {
                    opacity: 1,
                    transform: transformString(topLeft),
                }
            },
            update: node => {
                const topLeft = getTopLeft(node)
                return {
                    opacity: 1,
                    transform: transformString(topLeft),
                }
            },
            leave: node => {
                let collapsedParentPosition = {
                    top: 0,
                    left: 0,
                }
                if (node.parent) {
                    const collapsedParent = findCollapsedParent(node.parent)
                    collapsedParentPosition = {
                        top: collapsedParent
                            ? getX0(collapsedParent)
                            : node.parent.x,
                        left: collapsedParent
                            ? getY0(collapsedParent)
                            : node.parent.y,
                    }
                }

                return {
                    opacity: 0,
                    transform: transformString(collapsedParentPosition),
                }
            },
        },
    )

    return (
        <>
            {/* {nodes.map(node => (
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
            ))} */}
            {/* {transitions.map(({ item, key, props }) => (
                <animated.g
                    opacity={props.opacity}
                    transform={props.transform}
                    onClick={() => onNodeClick(item)}
                    style={{
                        cursor: "pointer",
                        pointerEvents: props.opacity
                            ? props.opacity.interpolate(v =>
                                  (v as number) < 0.5 ? "none" : "all"
                              )
                            : "none",
                    }}
                    id={key}
                    key={key}
                >
                    <Node node={item} />
                </animated.g>
            ))} */}
            {transitions((style, item) => (
                <animated.g
                    opacity={style.opacity}
                    transform={style.transform}
                    onClick={() => onNodeClick(item)}
                    style={{
                        cursor: "pointer",
                        pointerEvents: style.opacity.to(v => v < 0.5 ? "none" : "all")
                    }}
                >
                    <Node node={item} />
                </animated.g>
            ))}
        </>
    )
}
