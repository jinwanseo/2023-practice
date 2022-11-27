export default `#graphql
    type CreateUserResult {
        ok: Boolean!
        token: String
        error: String
    }
    type Mutation {
        createUser(
            name: String!
            phone: String!
            storeId: Int!
        ): CreateUserResult
    }
`;
