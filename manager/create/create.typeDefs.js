export default `#graphql
    type CreateManagerResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        createManager(
            username: String!
            password: String!
            storeName: String!
            storeNumber: String!
            storeAddress: String!
        ): CreateManagerResult
    }
`;
