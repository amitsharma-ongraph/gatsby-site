/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 *
 *
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: "Recepies",
    description: "Gatsby js Recepies site",
    person: {
      name: "user",
      age: 23,
    },
    values: [
      {
        name: "option1",
        value: 10,
      },
      {
        name: "option2",
        value: 12,
      },
      {
        name: "option3",
        value: 8,
      },
      {
        name: "option4",
        value: 20,
      },
    ],
  },
  plugins: [
    {
      resolve: "@chakra-ui/gatsby-plugin",
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {number} [portalZIndex=undefined]
         * The z-index to apply to all portal nodes. This is useful
         * if your app uses a lot z-index to position elements.
         */
        portalZIndex: undefined,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `thxe9dlsecse`,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/assests/images`,
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
  ],
};
