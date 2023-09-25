/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Jenkins Contributor Spotlight`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/",
    },
    __key: "images"
  },{
    resolve: 'gatsby-plugin-manifest',
    options: {
      name: `Jenkins Contributor Spotlight`,
      short_name: `Contributor Spotlight`,
      start_url: `/`,
      display: `standalone`,
      icon: `src/images/jenkins.png`,
    },
  }]
};