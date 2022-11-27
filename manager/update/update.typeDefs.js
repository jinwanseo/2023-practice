export default `#graphql
    type UpdateManagerResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        updateManager(
            name: String
            phone: String
            email: String
            storeName: String
            storeNumber: String
            storeAddress: String
        ): UpdateManagerResult
        changePasswordManager(
            oldPassword: String!
            newPassword: String!
        ) :UpdateManagerResult
    }
`;
