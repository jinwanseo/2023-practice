export default `#graphql
    type User {
        id: Int!
        name: String!
        phone: String!
        standByList: [StandBy]
    }
    type Query {
        seeUser(id: Int!): User
    }
`;
