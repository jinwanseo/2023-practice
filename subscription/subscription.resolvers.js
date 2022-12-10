import { withFilter } from "graphql-subscriptions";
import client from "../client.js";
import { UPDATE_STANDBYLIST } from "../constants.js";
import pubsub from "../pubsub.js";
export default {
  Subscription: {
    updateStandBy: {
      subscribe: (root, args, context, info) =>
        withFilter(
          () => pubsub.asyncIterator([UPDATE_STANDBYLIST]),
          async (payload, variables) => {
            const searchStore = await client.store.findFirst({
              where: {
                id: payload.updateStandBy.storeId,
                managers: {
                  some: {
                    id: context.loggedInManager.id,
                  },
                },
              },
            });

            return !!searchStore;
          }
        )(root, args, context, info),
    },
  },
};
