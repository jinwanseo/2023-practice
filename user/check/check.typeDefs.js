export default `#graphql
    type CheckCountResult {
        ok: Boolean!,
        count: Int,
        error: String
    }

    type Query {
        checkStore(storeId: Int!): Store
        checkCountFromUser(storeId: Int!): CheckCountResult
        checkStandByListFromUser: [StandBy]
    }
`;
