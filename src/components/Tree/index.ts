import { HierarchyPointNode, HierarchyLink } from "@visx/hierarchy/lib/types"

export { default } from "./Tree"

export interface TreeData {
    attributes: {
        description: string,
        familySize: number,
        id: string,
        positions: string[],
        year: string,
    },
    isExpanded?: boolean
    x0?: number,
    y0?: number,
    name: string,
    children: this[],
}

export type NodeType = HierarchyPointNode<TreeData>

export type LinkType = HierarchyLink<TreeData>