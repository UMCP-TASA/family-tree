import React from "react"
import { LinkHorizontal } from "@visx/shape"
import {LinkHorizontalDiagonalProps} from "@visx/shape/lib/shapes/link/diagonal/LinkHorizontal"
import { LinkType, NodeType } from "."
import { AddSVGProps } from "@visx/shape/lib/types"

export type LinkProps = AddSVGProps<LinkHorizontalDiagonalProps<LinkType, NodeType>, SVGPathElement>

const Link = (props: LinkProps) => <LinkHorizontal {...props} />

type LinksProps = Omit<LinkProps, "data"> & {
    links: LinkType[],
}

export default function Links(props: LinksProps) {
    const { links, ...rest} = props
    return (
        <>
            {links.map((link, i) => <Link data={link} {...rest} key={i} stroke="green" fill="none"/>)}
        </>
    )
}