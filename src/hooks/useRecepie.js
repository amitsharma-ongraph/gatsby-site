import { graphql, useStaticQuery } from "gatsby";

export const useRecepie = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allContentfulRecepie(sort: { title: ASC }) {
        nodes {
          id
          title
          cookTime
          prepTime
          description {
            description
          }
          content {
            tags
          }
          image {
            gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
          }
        }
      }
    }
  `);
  return {
    getAllRecepies: () => data.allContentfulRecepie.nodes,
    getTags: () => {
      const recepies = data.allContentfulRecepie.nodes;
      const tags = new Map();
      recepies.forEach((recepie) => {
        recepie.content.tags.forEach((tag) => {
          if (tags.has(tag)) {
            tags.set(tag, tags.get(tag) + 1);
          } else {
            tags.set(tag, 1);
          }
        });
      });

      const tagsArray = [];
      tags.forEach((value, key) => {
        tagsArray.push({
          name: key,
          count: value,
        });
      });
      return tagsArray;
    },
  };
};
