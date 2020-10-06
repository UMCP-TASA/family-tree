import React from "react"
import { useTheme } from "@material-ui/core"
import { LinkHorizontal } from "@visx/shape"
import { LinkHorizontalDiagonalProps } from "@visx/shape/lib/shapes/link/diagonal/LinkHorizontal"
import { LinkType, NodeType } from "."
import { AddSVGProps } from "@visx/shape/lib/types"
import { useTransition, animated } from "react-spring"
import { Transition } from "react-spring/renderprops"
import { findCollapsedParent, getX0, getY0 } from "@utils"

export type LinkProps = AddSVGProps<
    LinkHorizontalDiagonalProps<LinkType, NodeType>,
    SVGPathElement
>

const Link = (props: LinkProps) => <LinkHorizontal {...props} />
const AnimatedLink = animated(Link)

type LinksProps = Omit<LinkProps, "data"> & {
    links: LinkType[]
}

const keyAccessor = (link: LinkType) =>
    `${link.source.data.attributes.id}-${link.target.data.attributes.id}`

interface TransitionOutput extends React.CSSProperties {
    sx: number
    sy: number
    tx: number
    ty: number
}

export default function Links(props: LinksProps) {
    const { links, ...rest } = props
    const theme = useTheme()
    // const transitions = useTransition<LinkType, TransitionOutput>(
    //     links,
    //     link => keyAccessor(link),
    //     /* @ts-ignore I really don't know what's going on here*/
    //     {
    //         from: ({ source, target }) => ({
    //             sx: getX0(source),
    //             sy: getY0(source),
    //             tx: getX0(target),
    //             ty: getY0(target),
    //         }),
    //         enter: ({ source, target }) => ({
    //             sx: source.x,
    //             sy: source.y,
    //             tx: target.x,
    //             ty: target.y,
    //         }),
    //         update: ({ source, target }) => ({
    //             sx: source.x,
    //             sy: source.y,
    //             tx: target.x,
    //             ty: target.y,
    //         }),
    //         leave: ({ source }) => {
    //             const collapsedParent = findCollapsedParent(source)
    //             return {
    //                 sx: getX0(collapsedParent),
    //                 sy: getY0(collapsedParent),
    //                 tx: getX0(collapsedParent),
    //                 ty: getY0(collapsedParent),
    //             }
    //         },
    //     }
    // )

    // const transitions = useTransition(links, link => keyAccessor(link), {
    //     from: {
    //         opacity: 0,
    //     },
    //     enter: {
    //         opacity: 1,
    //     },
    //     update: {
    //         opacity: 1,
    //     },
    //     leave: {
    //         opacity: 0,
    //     },
    //     unique: true,
    // })
    return (
        <>
            {links.map((link, i) => (
                <LinkHorizontal
                    data={link}
                    {...rest}
                    stroke={theme.palette.link.main}
                    strokeWidth="1"
                    fill="none"
                    key={keyAccessor(link)}
                />
            ))}
            {/* {transitions.map(({ item, key, props }) => (

                    <AnimatedLink
                    data={item}
                        // data={{
                        //     source: { ...item.source, x: props.sx, y: props.sy },
                        //     target: { ...item.target, x: props.tx, y: props.ty },
                        // }}
                        // data={{
                        //     source: {
                        //         ...item.source,
                        //         x: item.source.x,
                        //         y: item.source.y,
                        //     },
                        //     target: {
                        //         ...item.target,
                        //         x: props.tx,
                        //         y: props.ty,
                        //     },
                        // }}
                        stroke="rgb(254,110,158,0.6)"
                        strokeWidth="1"
                        opacity={props.opacity}
                        fill="none"
                        key={key}
                    />
            ))} */}
        </>
    )
}
