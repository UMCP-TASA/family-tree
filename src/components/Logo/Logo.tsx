import React from "react"
import { useTheme } from "@material-ui/core"
import { useStaticQuery, graphql } from "gatsby"
import Img, { FixedObject } from "gatsby-image"

import { LogoQuery } from "root/graphql-types"

type Props = {
    type?: "light" | "dark"
}

export default function Logo(props: Props) {
    const { type = useTheme().palette.type } = props

    const data = useStaticQuery<LogoQuery>(graphql`
        query Logo {
            black: file(relativePath: { eq: "logo.png" }) {
                childImageSharp {
                    fixed(width: 50, height: 50) {
                        ...GatsbyImageSharpFixed_withWebp
                    }
                }
            }
            white: file(relativePath: { eq: "logo_white.png" }) {
                childImageSharp {
                    fixed(width: 50, height: 50) {
                        ...GatsbyImageSharpFixed_withWebp
                    }
                }
            }
        }
    `)

    const image =
        type == "dark"
            ? data.white?.childImageSharp?.fixed
            : data.black?.childImageSharp?.fixed
    return (
        <>
            {image && (
                <Img fixed={image as FixedObject} alt="logo of UMCP TASA" />
            )}
        </>
    )
}
