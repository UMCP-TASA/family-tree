import { NodeType } from "components/Tree"
import { ZoomType } from "components/Zoom"

export const isExpanded = (node: NodeType) => node.data.isExpanded || node.data.isExpanded == undefined

export const getX0 = (node: NodeType) => node.data.x0 ? node.data.x0 : node.x
export const getY0 = (node: NodeType) => node.data.y0 ? node.data.y0 : node.y

export const getTopLeft = (node: NodeType) =>  ({
    top: node.x,
    left: node.y
})

export function findCollapsedParent(node: NodeType): NodeType {
    if(!isExpanded(node)) {
        return node
    } else if (node.parent) {
        return findCollapsedParent(node.parent)
    } else {
        return node
    }
}



/**
 * This function can be optimized!!
 * Perhaps by utilizing the fact that the base data doesn't change?
 * Maybe we could pre-compute the possible paths to each person so this search
 * wouldn't have to actually perform a depth-first search every time
 * @param nameToFind 
 * @param tree 
 */
export function findNodeFromName(nameToFind: string, node: NodeType): NodeType[] {
    // Currrently a depth first search
    const stack: NodeType[] = [node]
    const name = nameToFind.toUpperCase()
    const results = []

    while(stack.length > 0) {
        const currentNode = stack.pop() as NodeType
        if(currentNode.data.name.toUpperCase().startsWith(name))
            results.push(currentNode)

        currentNode.children?.forEach((childNode) => {
            stack.push(childNode)
        })
    }

    return results
}