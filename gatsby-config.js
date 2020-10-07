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
        `gatsby-plugin-material-ui`,
        {
            resolve: "gatsby-plugin-manifest",
            options: {
                name: "UMCP TASA Family Tree",
                short_name: "Family Tree",
                start_url: "/",
                background_color: "#663399",
                theme_color: "#663399",
                display: "minimal-ui",
                icon: "static/logo.png", // This path is relative to the root of the site.
            },
        },

        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        "gatsby-plugin-offline",
    ],
}
