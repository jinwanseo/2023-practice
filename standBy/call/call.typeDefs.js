export default `#graphql
    type CallResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        call(userId: Int!) : CallResult
    }
`;
