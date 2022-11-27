export default `#graphql
    type CheckResult {
        ok: Boolean!
        error: String
    }
    type Query {
        checkUsername(username: String!):CheckResult
        checkPassword(password: String!):CheckResult
    }
`;
