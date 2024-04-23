export default `#graphql
    type StateResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        enter(userId: Int!): StateResult
        call(userId: Int!) : StateResult
        cancel(userId: Int!): StateResult
    }
`;
