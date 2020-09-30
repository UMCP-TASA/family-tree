import { notEqual } from "assert"
import { NodeType } from "components/Tree"

export const isExpanded = (node: NodeType) => node.data.isExpanded || node.data.isExpanded == undefined

export const getX0 = (node: NodeType) => node.data.x0 ? node.data.x0 : node.x
export const getY0 = (node: NodeType) => node.data.y0 ? node.data.y0 : node.y

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
