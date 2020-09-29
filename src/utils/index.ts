import { NodeType } from "components/Tree"

export function findCollapsedParent() {}

export function getTopLeft(node: NodeType) {
    return {
        top: node.x,
        left: node.y
    }
}