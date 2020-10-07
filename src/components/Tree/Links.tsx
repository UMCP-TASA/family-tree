import React from "react"
import { useTheme } from "@material-ui/core"
import { LinkHorizontal} from "@visx/shape"
import { LinkType } from "."
import { useTransition, animated } from "react-spring"
import { findCollapsedParent, getX0, getY0 } from "@utils"

interface TransitionOutput extends React.CSSProperties {
    sx: number
    sy: number
    tx: number
    ty: number
    opacity: number
}

type LinkProps = React.SVGAttributes<SVGPathElement> & TransitionOutput

const Link = (props: LinkProps) => {
    const { sx, sy, tx, ty, ...rest } = props
    const slope = tx - sx == 0 ? 0 : (ty - sy) / (tx - sx)
    const b = sy - slope * sx
    const offset = 100

    const c1x = (tx - sx) / 3 + sx
    const c1y = slope * c1x + b

    const c2x = ((tx - sx) * 2) / 3 + sx
    const c2y = slope * c2x + b
    return (
        <path
            d={`
            M ${sy},${sx} 
            C ${c1y + offset},${c1x} ${c2y - offset},${c2x} ${ty},${tx}
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
    const transitions = useTransition<LinkType, TransitionOutput>(links, {
        key: (link: LinkType) =>
            `${link.source.data.attributes.id}-${link.target.data.attributes.id}`,
        from: ({ source, target }) => ({
            sx: getX0(source),
            sy: getY0(source),
            tx: getX0(target),
            ty: getY0(target),
            opacity: 0,
        }),
        enter: ({ source, target }) => ({
            sx: source.x,
            sy: source.y,
            tx: target.x,
            ty: target.y,
            opacity: 1,
        }),
        update: ({ source, target }) => ({
            sx: source.x,
            sy: source.y,
            tx: target.x,
            ty: target.y,
            opacity: 1,
        }),
        leave: ({ source }) => {
            const collapsedParent = findCollapsedParent(source)
            return {
                sx: getX0(collapsedParent),
                sy: getY0(collapsedParent),
                tx: getX0(collapsedParent),
                ty: getY0(collapsedParent),
                opacity: 0,
            }
        },
    })

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
            {transitions((style, __) => (
                <AnimatedLink
                    sx={style.sx}
                    sy={style.sy}
                    tx={style.tx}
                    ty={style.ty}
                    // @ts-ignore Stroke is invalid here hecause of Animated but it's fine
                    stroke={theme.palette.link.main}
                    opacity={style.opacity}
                    strokeWidth="1"
                    fill="none"
                />
            ))}
        </>
    )
}
