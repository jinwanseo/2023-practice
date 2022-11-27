export default `#graphql
    type DeleteStandByResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        deleteStandByFromUser(storeId: Int!): DeleteStandByResult
        deleteStandByFromManager(userId: Int!): DeleteStandByResult
    }
`;
