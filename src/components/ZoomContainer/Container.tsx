import React from "react"
import { Text } from "@visx/text"
import { Zoom } from "@visx/zoom"
import { localPoint } from "@visx/event"

export type ContainerProps = {
    width: number
    height: number
    children: React.ReactNode
}

export default function Container(props: ContainerProps) {
    const { width, height, children } = props
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
                        {children}
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
