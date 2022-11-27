export default `#graphql
    type CancelResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        cancel(userId: Int!): CancelResult
    }
`;
