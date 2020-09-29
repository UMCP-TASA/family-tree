import React from "react"
import { Text } from "@visx/text"
import { Zoom } from "@visx/zoom"
import { localPoint } from "@visx/event"
import { GradientPinkBlue } from "@visx/gradient"

export type TreeProps = {
    width: number
    height: number
}

export default function Tree(props: TreeProps) {
    const { width, height } = props
    return (
        <Zoom
            width={width}
            height={height}
            scaleXMin={1 / 2}
            scaleXMax={4}
            scaleYMin={1 / 2}
            scaleYMax={4}
        >
            {zoom => (
                <svg
                    width={width}
                    height={height}
                    style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
                >
                    <g transform={zoom.toString()}>
                        <Text x={width / 2} y={height / 2}>
                            Hello World
                        </Text>
                    </g>

                    <rect
                        width={width}
                        height={height}
                        fill="transparent"
                        onTouchStart={zoom.dragStart}
                        onTouchMove={zoom.dragMove}
                        onTouchEnd={zoom.dragEnd}
                        onMouseDown={zoom.dragStart}
                        onMouseMove={zoom.dragMove}
                        onMouseUp={zoom.dragEnd}
                        onMouseLeave={() => {
                            if (zoom.isDragging) zoom.dragEnd()
                        }}
                        onDoubleClick={event => {
                            const point = localPoint(event) || { x: 0, y: 0 }
                            zoom.scale({ scaleX: 1.1, scaleY: 1.1, point })
                        }}
                    />
                </svg>
            )}
        </Zoom>
    )
}
