export default `#graphql
    type Query {
        seeStandByList(page: Int,itemCnt: Int): [StandBy]
    }
`;
