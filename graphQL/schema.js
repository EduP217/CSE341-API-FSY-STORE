const { makeExecutableSchema } = require("graphql-tools");
const { resolvers } = require("./resolvers");

const typeDefs = `
    type Query {
        hello: String
    }
`;

module.exports.schema = makeExecutableSchema({
    typeDefs,
    resolvers
});