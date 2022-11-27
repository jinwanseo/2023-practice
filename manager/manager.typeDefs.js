export default `#graphql
    type Manager {
        id: Int!
        username: String!
        password: String!
        name: String!
        phone: String!
        email: String
        store: Store
        storeId: Int
        createdAt: String
        updatedAt: String
    }
`;
