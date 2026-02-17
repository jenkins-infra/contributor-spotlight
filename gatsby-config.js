/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
    siteMetadata: {
        title: `Jenkins Contributor Spotlight`,
        siteUrl: `https://contributors.jenkins.io`,
        description: `Jenkins Contributor Spotlight is where we celebrate the contributions of Jenkins community members`,
    },
    plugins: [
        'gatsby-plugin-image',
        'gatsby-plugin-sitemap',
        'gatsby-plugin-sharp',
        'gatsby-transformer-sharp',
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `pages`,
                path: `${__dirname}/src`,
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: `Jenkins Contributor Spotlight`,
                short_name: `Contributor Spotlight`,
                start_url: `/`,
                display: `standalone`,
                icon: `${__dirname}/src/images/jenkins.png`,
            },
        },
        `gatsby-transformer-asciidoc`,
        {
            resolve: `gatsby-transformer-asciidoc`,
            options: {
                attributes: {
                    imagesdir: `${__dirname}/static@`,
                },
            },
        },
        {
            resolve: `gatsby-omni-font-loader`,
            options: {
                enableListener: true,
                preconnect: [
                    `https://fonts.googleapis.com`,
                    `https://fonts.gstatic.com`,
                ],
            },
        },
    ],
};
