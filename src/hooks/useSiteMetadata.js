import { graphql, useStaticQuery } from "gatsby";

export const useSiteMetadata = () => {
  const data = useStaticQuery(graphql`
    query MyQueryy {
      site {
        id
        siteMetadata {
          description
          title
          person {
            age
            name
          }
          values {
            name
            value
          }
        }
      }
    }
  `);
  return {
    getSiteMetadata: () => {
      return data;
    },
    getValues: () => data.site.siteMetadata.values,
  };
};
