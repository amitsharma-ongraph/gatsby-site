const path = require(`path`);
const slugify = require("slugify");
// Log out information after a build is done
exports.onPostBuild = ({ reporter }) => {
  reporter.info(`Your Gatsby site has been built!`);
};
// Create blog pages dynamically
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const tagTemplate = path.resolve(`src/templates/tag.js`);
  const result = await graphql(`
    query TagQuery {
      allContentfulRecepie {
        nodes {
          content {
            tags
          }
        }
      }
    }
  `);
  await result.data.allContentfulRecepie.nodes.forEach((recepie) => {
    recepie.content.tags.forEach(async (tag) => {
      const tagSlug = slugify(tag, { lower: true });
      await createPage({
        path: `/tag/${tagSlug}`,
        component: tagTemplate,
        context: {
          title: tag,
        },
      });
    });
  });
};
