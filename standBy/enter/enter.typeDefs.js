export default `#graphql
    type EnterResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        enter(userId: Int!): EnterResult
    }
`;
