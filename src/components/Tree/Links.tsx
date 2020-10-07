import React from "react"
import { useTheme } from "@material-ui/core"
import { LinkType } from "."
import { useTransition, animated, to } from "react-spring"
import { findCollapsedParent, getX0, getY0 } from "@utils"

interface TransitionOutput extends React.CSSProperties {
    sx: number
    sy: number
    tx: number
    ty: number
}

type LinkProps = React.SVGAttributes<SVGPathElement> & TransitionOutput

const Link = (props: LinkProps) => {
    const { sx, sy, tx, ty, ...rest } = props
    return (
        <path
            d={`M ${sy},${sx} L ${ty},${tx}
    `}
            {...rest}
        />
    )
}

const AnimatedLink = animated(Link)

type LinksProps = {
    links: LinkType[]
}



export default function Links(props: LinksProps) {
    const { links } = props
    const theme = useTheme()
    const transitions = useTransition<LinkType, TransitionOutput>(
        links,
        {
            key: (link: LinkType) =>
                `${link.source.data.attributes.id}-${link.target.data.attributes.id}`,
            from: ({ source, target }) => ({
                sx: getX0(source),
                sy: getY0(source),
                tx: getX0(target),
                ty: getY0(target),
            }),
            enter: ({ source, target }) => ({
                sx: source.x,
                sy: source.y,
                tx: target.x,
                ty: target.y,
            }),
            update: ({ source, target }) => ({
                sx: source.x,
                sy: source.y,
                tx: target.x,
                ty: target.y,
            }),
            leave: ({ source }) => {
                const collapsedParent = findCollapsedParent(source)
                return {
                    sx: getX0(collapsedParent),
                    sy: getY0(collapsedParent),
                    tx: getX0(collapsedParent),
                    ty: getY0(collapsedParent),
                }
            },
        }
    )

    return (
        <>
            {/* {links.map((link, i) => (
                <LinkHorizontal
                    data={link}
                    {...rest}
                    stroke={theme.palette.link.main}
                    strokeWidth="1"
                    fill="none"
                    key={keyAccessor(link)}
                />
            ))} */}
            {transitions((style, item) => (
                <AnimatedLink
                    sx={style.sx}
                    sy={style.sy}
                    tx={style.tx}
                    ty={style.ty}
                    stroke={theme.palette.link.main}
                    strokeWidth="1"
                    opacity={props.opacity}
                    fill="none"
                />
            ))}
        </>
    )
}
