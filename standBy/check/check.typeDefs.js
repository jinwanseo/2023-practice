export default `#graphql
    type Query {
        checkStandByListFromStore(page: Int,itemCnt: Int): [StandBy]
    }
`;
