export default `#graphql
    type PhotoResult {
        ok: Boolean!
        error: String
    }
    type Mutation {
        uploadPhoto(file: Upload!): PhotoResult
        deletePhoto(id: Int!): PhotoResult
    }
`;
