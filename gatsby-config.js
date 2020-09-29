/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        title: "TASA Family Tree",
        author: "UMCP TASA",
        description: "Family tree for UMCP TASA",
        siteUrl: "https://familytree.umcptasa.com",
    },
    plugins: [
        `gatsby-plugin-typescript`,
        {
            resolve: `gatsby-alias-imports`,
            options: {
                aliases: {
                    "@utils": `src/utils`
                },
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `assets`,
                path: `${__dirname}/src/assets`,
            },
        },
        `gatsby-plugin-styled-components`,
    ],
}
