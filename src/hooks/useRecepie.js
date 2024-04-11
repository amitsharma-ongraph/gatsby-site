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
  console.log(data);
  return {
    getAllRecepies: () => data.allContentfulRecepie.nodes,
  };
};
