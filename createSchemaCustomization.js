exports.createSchemaCustomization = async ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    type Page implements Node {
      id: ID!
      slug: String!
    }
  `;
  createTypes(typeDefs);
}
