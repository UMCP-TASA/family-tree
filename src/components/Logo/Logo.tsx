import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img, { FixedObject } from "gatsby-image"

import { LogoQuery } from "root/graphql-types"

type Props = {}

export default function Logo(props: Props) {
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

    const image = data.black?.childImageSharp?.fixed
    return (
        <>
            {image && (
                <Img fixed={image as FixedObject} alt="logo of UMCP TASA" />
            )}
        </>
    )
}
