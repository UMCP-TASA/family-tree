import { NodeType } from "components/Tree"

export const isExpanded = (node: NodeType) => node.data.isExpanded || node.data.isExpanded == undefined

export function findCollapsedParent(node: NodeType): NodeType {
    if(!isExpanded(node)) {
        return node
    } else if (node.parent) {
        return findCollapsedParent(node.parent)
    } else {
        return node
    }
}

export function getTopLeft(node: NodeType) {
    return {
        top: node.x,
        left: node.y
    }
}