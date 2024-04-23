import { withFilter } from "graphql-subscriptions";
import client from "../client.js";
import { UPDATE_STANDBYLIST } from "../constants.js";
import pubsub from "../pubsub.js";
export default {
  Subscription: {
    // 유저 (대기 등록, 대기 취소시) -> 스토어 알림
    updateStandByFromUser: {
      subscribe: (root, args, context, info) =>
        withFilter(
          () => pubsub.asyncIterator([UPDATE_STANDBYLIST]),
          async (payload, variables) => {
            const { updateStandByFromUser: standBy } = payload;
            return standBy.storeId === context.loggedInManager.storeId;
          }
        )(root, args, context, info),
    },
    // 매니저 (호출, 입장, 취소시) -> 유저 알림
    updateStandByFromManager: {
      subscribe: (root, args, context, info) =>
        withFilter(
          () => pubsub.asyncIterator([UPDATE_STANDBYLIST]),
          (payload, variables) => {
            const { updateStandByFromManager: standBy } = payload;
            return standBy.userId === context.loggedInUser.id;
          }
        )(root, args, context, info),
    },
  },
};
