export default `#graphql
    type LoginManagerResult {
        ok: Boolean!
        token: String
        error: String
    }
    type Mutation {
        loginManager(username: String!, password: String!): LoginManagerResult
    }
`;
