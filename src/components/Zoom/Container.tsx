import React from "react"
import { Zoom } from "@visx/zoom"
import { localPoint } from "@visx/event"
import { withParentSize } from "@visx/responsive"
import {
    WithParentSizeProps,
    WithParentSizeProvidedProps,
} from "@visx/responsive/lib/enhancers/withParentSize"

import { ZoomType } from "."

export type PassedProps = {
    width: number
    height: number
    zoom: ZoomType
}

export type ContainerProps = WithParentSizeProps &
    WithParentSizeProvidedProps & {
        children: (passed: PassedProps) => React.ReactNode
    }

function Container(props: ContainerProps) {
    const { parentWidth = 1000, parentHeight = 800, children } = props
    const width = parentWidth * 0.99
    const height = parentHeight * 0.99

    return (
        <Zoom
            width={width}
            height={height}
            scaleXMin={1 / 2}
            scaleXMax={4}
            scaleYMin={1 / 2}
            scaleYMax={4}
        >
            {zoom => children({ width, height, zoom })}
        </Zoom>
    )
}

export default withParentSize(Container)
