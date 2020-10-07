/**
 * SEO stands for Search Engine Optimization
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

type MetaType = {
    name: string
    content: string
}

type SEOProps = {
    lang?: string
    meta?: MetaType[]
    description?: string
    title: string
}

const SEO = (props: SEOProps) => {
    const { lang = "en", meta = [], description = "", title } = props // assignment means default props

    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={title}
            meta={[
                {
                    name: `description`,
                    content: description,
                },
                {
                    property: `og:title`,
                    content: title,
                },
                {
                    property: `og:description`,
                    content: description,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
            ].concat(meta)}
        />
    )
}

export default SEO
