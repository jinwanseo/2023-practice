export default `#graphql
    type DeleteStandByResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        deleteStandBy(storeId: Int!): DeleteStandByResult
    }
`;
