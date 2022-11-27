export default `#graphql
    type CheckCountResult {
        ok: Boolean!,
        count: Int,
        error: String
    }
    type Query {
        checkCount(storeId: Int!): CheckCountResult
    }
`;
