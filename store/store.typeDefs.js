export default `#graphql
    type Store {
        id: Int!
        name: String!
        number: String!
        address: String!
        photos: [Photo]
        standByList: [StandBy]
        managers: [Manager]
        createdAt: String
        updatedAt: String
    }
`;
