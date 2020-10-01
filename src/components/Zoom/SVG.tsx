import React from "react"
import { localPoint } from "@visx/event"
import { ZoomType } from "."

export type Props = {
    width: number
    height: number
    zoom: ZoomType
    children: React.ReactNode
}

export default function SVG(props: Props) {
    const { width, height, zoom, children } = props

    return (
        <svg
            width={width}
            height={height}
            style={{ cursor: zoom.isDragging ? "grabbing" : "grab" }}
        >
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
            <g transform={zoom.toString()}>
                {children}
            </g>
        </svg>
    )
}
