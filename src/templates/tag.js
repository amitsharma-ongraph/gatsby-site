import React from "react";
import Layout from "../components/Layout";
import RecepieList from "../components/recepies/RecepieList";
import { graphql } from "gatsby";

function tag({ data, pageContext }) {
  const recepies = data.allContentfulRecepie.nodes;
  return (
    <Layout>
      <RecepieList
        title={`${pageContext.title} Recepies`}
        recepies={recepies}
      />
    </Layout>
  );
}

export const query = graphql`
  query GetTagRecepies($title: String) {
    allContentfulRecepie(filter: { content: { tags: { eq: $title } } }) {
      nodes {
        content {
          ingredients
          instructions
          tags
        }
        cookTime
        description {
          description
        }
        image {
          gatsbyImageData(layout: CONSTRAINED, placeholder: TRACED_SVG)
        }
        prepTime
        servings
        title
      }
    }
  }
`;

export default tag;
