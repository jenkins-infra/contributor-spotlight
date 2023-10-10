/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Jenkins Contributor Spotlight`,
    siteUrl: `https://www.jenkins.io/`
  },
  plugins: ["gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": `${__dirname}/src/images/`,
    },
    __key: "images"
  }, {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `pages`,
      path: `${__dirname}/src`,
    },
  }, {
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: `Jenkins Contributor Spotlight`,
      short_name: `Contributor Spotlight`,
      start_url: `/`,
      display: `standalone`,
      icon: `${__dirname}/src/images/jenkins.png`,
    },
  }, `gatsby-transformer-asciidoc`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `${__dirname}/src/utils/typography`,
      },
    },
    {
      resolve: `gatsby-transformer-asciidoc`,
      options: {
        attributes: {
          imagesdir: `${__dirname}/static@`,
        },
      },
    },
  ]
};