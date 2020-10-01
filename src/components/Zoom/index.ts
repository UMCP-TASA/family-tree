import { ZoomProps } from "@visx/zoom/lib/Zoom"

export { default as ZoomContainer } from "./Container"
export { default as ZoomSVG } from "./SVG"

export type ZoomType = Parameters<ZoomProps["children"]>[0]
export type SetZoomType = React.Dispatch<React.SetStateAction<ZoomType>>