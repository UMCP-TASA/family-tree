import React from "react"
import { Text } from "@visx/text"


export type TreeProps = {
    width: number,
    height: number,
}

export default function Tree(props: TreeProps) {
    const { width, height } = props
    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <Text>Hello World</Text>
        </svg>
    )

}