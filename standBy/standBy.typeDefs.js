export default `#graphql
    type StandBy {
        id: Int!
        user: User,
        store: Store,
        userId: Int,
        storeId: Int,
        createdAt: String
        updatedAt: String
    }
`;
