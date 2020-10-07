import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img, { FixedObject } from "gatsby-image"
import { makeStyles } from "@material-ui/core"

import { LogoQuery } from "root/graphql-types"

const useStyles = makeStyles(theme => ({
    link: {
        textDecoration: "none",
        display: "inline-block",
        margin: 0,
    },
}))

type Props = {}

export default function Logo(props: Props) {
    const classes = useStyles()
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
        <a
            className={classes.link}
            href="umcptasa.com"
            aria-label="Link to UMCP TASA website"
        >
            {image && (
                <Img fixed={image as FixedObject} alt="logo of UMCP TASA" />
            )}
        </a>
    )
}
