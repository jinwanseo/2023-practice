export default `#graphql
    type DeleteManagerResult{
        ok: Boolean!
        error: String
    }
    type Mutation {
        deleteManager: DeleteManagerResult
    }
`;
