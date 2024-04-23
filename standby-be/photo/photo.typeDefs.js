export default `#graphql
    scalar Upload
    type Photo {
        id: Int!
        file: Upload
        fileUrl: String!
        fileName: String!
        store: Store
        storeId: Int
        createdAt: String
        updatedAt: String
    }
`;
